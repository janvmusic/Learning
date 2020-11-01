## Handling events
- Similar to handle DOM events
- React uses **camelCase**
- You pass the function, instead of the event string
```javascript
// DOM
<button onclic="activateLasers()">
  Activate Lasers
</button>

// React
<button onClick={activateLassers}>
  Activate Lasers
</button>
```
- You cannot return `false` to prevent default behavior. You need to call `preventDefault`
- Events in react are defined as **synthetic**. So no need to worry about cross-web compatibility
- It's almost not required to use `addEventListener`.
- When you define a component using ES6, a common pattern is for an event handler to be a method on the class
- Be careful with the meaning of `this` in event callbacks for JSX; Class methods are not bound by default
- You can ignore `binding` by using `(arrow) => pattern`
```javascript
class LoggingButton extends React.Component {
  handleClick = () => {
    console.log("With this, bind is not required");
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>
        Click Me
      </button>
    );
  }
}
```
- The problem with this syntax is  that different callback is created each time.
- If this callback is created on a upper level and then passed to children... this would mean: extra renders!
- It's recommended to use `class` functions or `binding` at constructor level

### Passing arguments to event handlers
- Inside a loop, it's common to want to pass arguments or parameters to an event handler
```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
- `e` argument represents the **React Event** and it's required when using `arrow function`

