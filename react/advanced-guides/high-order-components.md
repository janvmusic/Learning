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
- You can think of **HOC** as parametrized containers.