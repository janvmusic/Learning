## State and Lifecycle
- **State** is part of the component
- It's private
- Fully controlled by the component

### Adding local State to a class
- Consider this `Clock` example:
```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
- To add state to this component, we need to invoke it's constructor
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      date: new Date();
    }
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
- `date` is the initial state for this component

### Adding lifecycle methods to a class
- In any application is important release resources
- `Mounting`: Step where component is rendered into DOM
- `Unmounting`: Step where component is removed from DOM
- React uses 2 methods for this: `componentDidMount` & `componentWillUnmount`
  - `componentDidMount`: runs after the component output has been rendered to DOM
  - `componentWillUnmount`: runs before the component will be removed
- When react detects that the state has changed, calls another lifecycle method: `render` with the new state value

### Use state correctly
- 3 basic rules to follow:

#### Do not set state directly
- The only place where you can assign a state is in the constructor
```javascript
// wrong
this.state.comment = "Hello";

// Correct
this.setState({
  comment = "Hello",
});
```
  
#### State updates may be asynchronous
- React may batch state updates for performance
- `this.props` & `this.state` must not be relied to calculate next state
```javascript
// wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
- Previous code may fail eventually. Use `function` form:
```javascript
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
```

#### State updates are merged
- When you call `setState` it updates only what its requested. It's **shallow** updated
- It replaces totally previous value.

### Data flows down
- Neither parent nor child component know if a certain component is `stateless` or `stateful`
- `state` is local and encapsulated
- Components may choose to pass down it's sate to child components
```javascript
<FormattedDate date={this.state.date} />
```
- Child component will receive this as part of it's props
- This is called: **top-down** or **unidirectional**
