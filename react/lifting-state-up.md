## Lifting State up
- Often, several components needs to reflect change data
- React recommends to **lift shared state up** to their closest common ancestor
- To perform this action it's required to move the state to a shared common ancestor
- As well it's required to send a **function** which will update parent's state
```javascript
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // Here is where we take parent's function to update shared state
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
- Each change on the parent state will trigger a chain reaction to children components

### Lesson Learned
- There should be a **single source of truth** in react applications
- It's a bad practice try to keep in sync states by yourself. Let react do it
- Lifting state > Two Way binding
- If something can be derived from either props of state, it probably should not be in the sate

