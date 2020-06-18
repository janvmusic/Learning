## Intro to JSX
- It's a syntax extension to JSX
- It's not HTML or Javascript
- **JSX** may remind you to template language
- **JSX** produces React "elements"

### Why JSX?
- React uses components to **Separate concerns**
- React does not require JSX

### Embedding expressions on JSX
```javascript
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
- Inside `{}` you can write Javascript expressions
  - For example: `2 + 2` or `user.firstName`
```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
- Wrapping in `()` is recommended to avoid **semi-colon automatic add**

### JSX is an expression too
- Once **JSX** expression gets compiled becomes regular Javascript
- This means you can use JSX inside `if`, `for`, assign it to variables and more
```javascript
function helloWorld(sayHi) {
  if (sayHi) {
    return <h1>{sayHi}</h1>
  }

  return <h1> Hello World </h1>
}
```

### Specifying attributes in JSX
- If a tag is empty you can close with `/>`, like XML
- JSX tags can contain children
```javascript
const avatar = <img src={user.avatarUrl} />

const greetings = (
  <div>
    <h1>Hello</h1>
    <h2>Good to see you here</h2>
  </div>
);
```

### JSX prevents injection attacks
- It's safe to embed user input in JSX
- By default **React DOM** scapes any value embedded in JSX before rendering them
- Everything is converted to a String before being rendered. This prevents **XSS attacks**
```javascript
const title = response.potentiallyMaliciousInput;

// this is safe to do
const element = <h1>{title}</h1>
```

### JSX represents objects
- Babel compules JSX down to `React.createElement()` calls
```javascript
const greetings = (
  <div>
    <h1>Hello</h1>
    <h2>Good to see you here</h2>
  </div>
);
```
- This is equals to:
```javascript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
- At the end React creates an object like this:
```javascript
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
- This is called **React Element**

