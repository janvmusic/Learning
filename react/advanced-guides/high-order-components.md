## High-order components
- This is a pattern that emerges from React's composition nature.
- It's used to **reuse code**
- A High Order Component (HOC) is a function that takes a _component_ as input and returns a _new component_

### Use HOCs For Cross-Cutting Concerns 
- **Components** are the primary unit of code reuse in React.
- However there are some patterns that aren't straightforward for components. Example:
- It's an abstraction that allows us to define common logic in a single place and share it across many
- **HOC** doesn't modify the input component, nor does it use inheritance to copy it's behavior.
- **HOC** composes the original component by _wrapping_ it in the container component.
- **HOC**, as part of functional programming, is a pure function with zero **side-effects**

### Don't mutate the original component. Use composition
- Example:
```javascript
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```
- **HOC** should not have a side effect
- Using `prototype` to modify the component is a bad pattern:
```javascript
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function(prevProps) {
    console.log('Current props: ', this.props);
    console.log('Previous props: ', prevProps);
  }

  // returning the original component it's a code smell
  return InputComponent;
}

const EnhancedComponent = logProps(InputComponent);
```
- Instead use composition:
```javascript
function logProps(WrappedComponent) {
  return class extends React.component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }

    render() {
      // returns a new WrappedComponent with new props
      return <WrappedComponent {...this.props} />;
    }
  }
} 
```
- You can think of **HOC** as parameterized containers.

### Convention: Pass unrelated Props through to the Wrapped Component
- HOCs add futures to a component; HOCs should not alter it's contract
- example:
```javascript
render () {
  // Remove HOCs specific props
  const { extraProp, ...passThroughProps } = this.props;
  
  // Inject props to wrapped component
  const injectedPropts = someStateOrInstanceMethod;

  // Pass props to wrapped component
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

### Convention: Maximizing Composability
- Single parameters
```javascript
const NavbarWithRouter = withRouter(Navbar);
```
- Multiple parameters
```javascript
const CommentWithRelay = Relay.createContainer(Comment, config);
```
- Most common; partially executed
```javascript
const ConnectedComment = connect(commentSelected, commentActions)(CommentList)
```
- Note: `connect` is a **High Order Function** that returns a **HOC**
- What problem solves having this? Well _Composability_ You use single parameter HOC which makes them easy to pass along `Component => Component`

### Convention: Wrap the display name for easy debugging
- The most common technique is to wrap the display name of the wrapped component.
```javascript
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

### Caveats
#### **Do not use HOCs inside the render method**
- React diffing algorithm uses component identity to determine wether it should update the existing subtree or throw it away and mount a new one (called **Reconciliation**)
- Using HOC creates a new component each time, so that would mean extra renders 
```javascript
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhace(MyComponent);
  
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```
- Remounting a component causes the state of that component and all of its children to be lost
- The ideal would be apply HOC outside the component definition

#### **Static methods must be copied over**
- Static methods are not carried over when using HOCs
```javascript
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```
- To solve this, manually copy static methods before returning new component:
```javascript
function enhance(WrappedComponent) {
  class Enhace extends React.Component { /* ... */ }

  Enhace.staticMethod = WrappedComponent.staticMethod;
  return Enhace;
}
```
- Previous solution requires you to know all static methods. You can also use `hoist-non-react-static`
- Another solution is to export the static methods separately from the component itself
```javascript
// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...export the method separately...
export { someFunction };

// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';
```

### Refs aren't passed through
- `Refs` are not real props, `Refs` are handled specially by react.
- Remember to use `React.forwardRef`




