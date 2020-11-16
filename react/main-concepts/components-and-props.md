## Components and Props
- **Components** lets you create reusable UI elements
- Conceptually **Components** are Javascript functions, they accept inputs and return react elements

### Function and Class component
- Components accepts **Props**
- Returns a **React Element**
- They are called as well **Function Components**
- They are as well available in ES6
```javascript
// ES5
function Welcome(props) {
  return <h1> Hello World </h1>
}

// ES6
class Welcome extends React.Component {
  render() {
    return <h1> Hello World </h1>
  }
}
```

### Rendering a component
- Components **can be created** by users
```javascript
const element = <Welcome name="Sarah" />
```
- `Welcome` component will receive `props`, in this case, `name="Sarah"`
- As part of best practices, Components should start with **capital letter**

### Composing Components
- Components can use other **Components** for their output

### Extracting components
- As part of best practices, Components should refrain to **Don't Repeat Yourself** and **Single Responsibility**
- Don't be afraid to extract logic to smaller components
- Remember the main objective of **Components** is to be reusable!

### Props are read only!
- Never override it's values. It's a bad practice
- **Pure functions** do not modify inputs and always return the same result based on inputs
- _All react components must act as pure functions with respect to their props_


