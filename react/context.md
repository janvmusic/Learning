## Context
- The concept of _context_ is a way to provide data through component tree without having to pass `props`
- The problem _context_ wants to solve it's to avoid passing same `props` everywhere!!!
- Examples: `Locale`, `UI Theme` 

### When to use Context?
- **Context** is designed to share data considered "global" for a tree of _react component_
- Examples: authenticated user info, theme or preferred language
- Let's see this example
```javascript
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render () {
    return <Button theme={this.props.theme} />;
  }
}
```

- This is how it would look using `Context`
```javascript
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <div>
      ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // React will find the closest theme Proveder and use it's value
  static contextType = ThemeContext;

  render() {
    return <Button theme={this.context} />;
  }
}
```

### Before you can use Context
- **Context** is used to share common data among components. 
- However makes component reuse difficult, so this should be applied in specific cases
- **Important** If you only want to avoid passing some props through many levels, **Component composition** is often a simpler solution than context!
- Example:
```javascript
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... which renders ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... which renders ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```
- One way to solve this issue (Passing user and Avatar through many levels) would be:
```javascript
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize}
    </Link>
  );

  return <PageLayout userLink={userLink} />
}

// Now, we have:
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
```
- With this change we avoid passing `props` down hill, and we use instead `userLink`
- This _inversion of control_ makes your code cleaner in many cases, by reducing the number of props you need to pass through different levels. This means **giving more control to root components**
- However moving complexity to **higher** levels is not the answer for everything. 
- Remember that you can pass `n` number of children through components.
```javascript
function Page(props) {
  const user = props.user;
  const content = <Feed user={user}
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );

  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```
- This pattern is _in most cases_ sufficient enough.
- However if you need _same data_ through different components and nesting levels, **Context** let's you _broadcast_ such data.

### API
#### React.createContext
```javascript
const MyContext = React.createContext(defaultValue);
```
- When react renders a components that subscribes to this **Context**, it will read the current context value from  the closest matching _Provider_ above in the tree
- The `defaultValue` is our `fallback`; It's only going to be used if we cannot find context in the tree
- Passing `undefined` does not mean that it will use `defaultValue` be careful

#### Context.provider
- Every *Context* react creates comes with a *Provider*
- *Provider* allows components to _consume_ _Context_
```javascript
<MyContext.provider value={/* some value */}>
```
- Accepts a `value` prop to be passed to consuming components
- One *Provider* can be connected to *many* consumers (1 to N)
- *Providers* can be nested, this will override other *Providers*
- Any change to `value` in the *Context*, will trigger re-renders to consumers
- The propagation from a Provider to its descendant consumers is not subject to the `shouldComponentUpdate` method
- Changes are determined by comparing the new and old values using the same algorithm as `Object.is`

#### Class.contextType
```javascript
class MyClass extends React.Component {
  componentDidMount() {
    /* perform a side-effect at mount using the value of MyContext */
    let value = this.context;
  }

  componentDidUpdate() {
    let value = this.context;
  }

  componentWillUnmount() {
    let value = this.context;  
  }

  render() {
    /* render something based on the value of MyContext */
    let value = this.context;
  }
}

MyClass.contextType = MyContextType
```
- You can assign `contextType` property
- This lets you consume the nearest current value of that Context type using `this.context`
- **Note:** Through the API you can only subscribe to **one** context
```javascript
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
  }
}
```

#### Context.Consumer
```javascript
  <MyContext.Consumer>
    {value => /* do something */}
  </MyContext.Consumer>
```
- This lets you subscribe to a context within a function component
- Child element needs to be a function
- The `value` argument passed will be matched against it's closest context prop
- `value` could be equal to `defaultValue`

#### Context.displayName
- Context objects accepts a `displayName` string property
- React `DevTools` uses this string to determine what to display for the context
```javascript
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // MyDisplayName.provider
<MyContext.Consumer> // MyDisplayName.Consumer
```

### Examples
#### Dynamic Context
- Create the context
```javascript
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(themes.dark);
```

- Then we create the consumer, in this case button
```javascript
import { ThemeContext } from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;

    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}

ThemedButton.contextType = ThemeContext;
export default ThemedButton;
```

- Now let's place this in practice
```javascript
import { ThemeContext, themes } from './theme-context';
import ThemeButton from './themed-button';

// An intermediate component taht uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({ 
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };
  }

  render() {
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page
    );
  }
}

ReactDOM.render(<App />, document.root);
```

### Updating Context from a Nested Component
- It's often required to update the context from a Component that is nested somewhere deeply in the component tree
- This is solved by passing a function through the components
```javascript
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
```

- theme-toggler-button.js
```javascript
import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
```

- Now let's practice!
```javascript
import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark
          ? themes.light
          : themes.dark,
      }));
    };

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.root);
```

### Consuming Multiple Contexts
- To keep `context-rendering` fast, we need to make each context consumer a separate node in the tree
```javascript
// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props;

    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

function Content() {
  return(
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContexts.Consumer>
  );
}
```
- If this happens often(2 contexts) you should consider to create a component that provides both

### Caveats
- `Context` uses reference identity to determine when to **re-render**
- Following code snippet will re-render all consumers because a new object is created every time
```javascript
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ something: 'something' }}
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

- To fix this, you should lift this to parent's state
```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        something: 'something',
      };
    }
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

