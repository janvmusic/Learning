## Forms
- This components works slightly different, they keep an inner state  

### Controller components
- in HTML, form elements like: `<input>`, `<textarea>` and `<select>` typically maintain they own state
- This state is updated based on user input
- React intents to have _one source of truth_ and `this.state` should be our _source of information_
- An input element controller by react, it's called **controlled component**
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>

        <input type="submit" value="Submit" />
    );
  }
}
```
- With a _controlled component_, the input is always driven by react state.
- More code written by you, however you can now pass this value to other child components

### The text area tag
- In HTML, `textarea` uses text as content
- In react, `textarea` uses `value` as content
```javascript
// HTML
<textarea>
  Hello there, this is some text in a text area
</textarea>

// react
<textarea value={this.state.value} onChange={this.handleOnChange} />
```

### The select tag
- In HTML select tag generates a _dropdown_. To select default element use `selected`
- In react select tag behaves the same, but uses `value` for selected value
```javascript
// HTML
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>

// react
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```
- **Select** allows you to pass arrays as value for multiple selects

### File input tag
- This is an uncontrolled component in react due value is read only.
```javascript
<input type="file />
```

### Handling multiple inputs
- When need to handle multiple `inputs` you can add a `name`
- With this you can handle separately
- To handle it's state you can use:
```javascript
this.setState({
  [name]: value,
});
```
- To call following statement you will to get name from `target`
```javascript
constructor(props) {
  super(props);

  this.state = {
    isChecked: false,
    numberOfGuests: 2,
  };
}

handleInputChange(event) {
  const target = event.target;
  const element = target.name;
  const value = element === 'username' ? target.checked : target.value;

  this.setState({
    [name]: value
  });
}
```

### Controlled input null value
- If you specify the prop value to a input, you make it non editable
- However you can make this value null... or undefined
```javascript
<input value="hi" />
<input value={null} /> // this is possible
```

