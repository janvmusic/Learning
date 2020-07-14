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
  return ()
}
```

#### TOPIC
content

#### TOPIC2
content

#### SOURCE Link
[Link Title](http://example.com)

