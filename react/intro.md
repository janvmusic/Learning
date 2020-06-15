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

