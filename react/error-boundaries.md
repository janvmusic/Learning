## Error Boundaries
Previously errors would corrupt components internal state. These errors were always caused by an earlier error in the application.

**Error boundaries** were created to handle this gracefully

### Introducing Error Boundaries
- An error in a UI component should not break the whole app
- **Error boundaries** are React components that catch errors anywhere in their child component tree, log those errors and display a fallback UI.
- **Error boundaries** catch errors during:
  - rendering
  - lifecycles methods
  - constructors
- **Error boundaries** don't catch errors for:
  - event handlers
  - Asynchronous code
  - Server side rendering
  - Errors inside the **error boundary**
- You can create your own **Error boundary** component if you add following methods
  - `getDerivedStateFromError`: renders a fallback UI
  - `componentDidCatch`: logs errors and information
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1> Something went wrong </h1>
    }

    return this.props.children;
  }
}
```
- **Error boundaries** act like Javascript `catch {}` for components

### Where to place Error Boundaries
- Better at a **top-level**


### New behavior for Uncaught errors
- Errors inside this component will mean that the whole child tree will be unmounted

### How about try/catch
- Works for imperative code, not declarative
```javascript
try {
  showButton();
} catch (error) {
  // ...
}
```
- While on declarative could be something else...
```javascript
<Button />
```
- **Error boundaries** preserves the declarative nature of React
- Errors will propagate to the closest error boundary

### How about Event Handlers
- **Error boundaries** do not catch errors inside event handlers
- If you need to catch errors for event handlers, use `try/catch`
- React does not need to recover from errors in event handlers
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <button onClick={this.handleClick}>Click Me</button>
  }
}
```

