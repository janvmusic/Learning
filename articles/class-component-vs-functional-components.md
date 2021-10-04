## React: Class vs Functional components
### What is component?
They are functions in react, they:
- Accept `props` as parameters
- Return a UI element
- They are reusable

### Class component
React allows you to define a `component` as a **class** or a **function**
```javascript
// Class Component
class Welcome extends Component {
  render() {
    return <div>Hello World</div>
  }
}
```

`render()` is the only method required for a _Class Component_. These type of components are **tied** to a the component **lifecycle methods**
- **_componentDidMount_** => Executed after initial render
- **_componentDidUpdate_** => Executed after an update on the component
- **_componentWillUnMount_** => When a component is removed from DOM, this method will be called

**important** Class components have **state**

### Function component
They are called as well "stateless" component.
```javascript
const Welcome = (props) => {
  return <div>Hello World</div>
}
```

This is a component because accepts `props` and returns an `UI element` to be shown

Functional components are **not tied** to `Lifecycle` methods, that's why we use `hooks`

**Hooks** allow your component to use the state and other react characteristics without depend on a class
```javascript
import React, { useState } from 'react';

const Welcome = (props) => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>Number of clicks: {counter}
      <button onClick={() => setCounter(counter++)}>
        Click me!
      </button>
    </div>
  );
}
```

Functional components are easier to `test` and `to read`


#### **Source**
[Class vs Functional components](https://twitter.com/brenditech/status/1403753559733293060)

