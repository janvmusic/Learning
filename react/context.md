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
- 

#### SOURCE Link
[Link Title](http://example.com)
