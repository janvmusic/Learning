## A Quick Guide to Understanding React Hooks
### React Hooks
Hooks allow us to use functional components, also with specific hooks we can take advantage of certain moments in the component lifecycle

### What is a hook?
A Hook is javascript function that follows a pre-defined schema in the form of a syntax and expect arguments

They follow certain rules:
- Can only be called from a functional component
- For react to correctly manage state created with hooks
- Hooks must be called in the top level of the component
- Never conditionally call hooks

### The useState hook
Functions are scoped and they do not depend on the weird `this`. Dumping and recreating their local variables with each invocation. 

There's no `prev` / `this` and persisting values is impossible without an outside variable.

Functional components are called `stateless`. Without state or lifecycle methods, these components were static and there was not a way to update the component.

`useState` taps into React's state system. Each call to `useState` creates a partition for the component and a way to update it.

```javascript
const [state, setState] = useState(0)
// state    -> current state of the component
// setState -> a way to update state
```

In a class component `state` is maintained as an object and new state values are restricted to that format
Remember 
```javascript
setState({
  ...
})
```

To get values from a react hook, use `array destructuring`. A good practice is call the state as something meaningful
```javascript
const [visible, setVisible] = useState(false); // get both values
const [, setVisible] = useState(false); // only get setter
const [visible,] = useState(false); // only get value
```

The value got from the hook will be persisted through renders.

**Important**: This feature makes it easy to separate concerns and reduce naming conflicts

### The useEffect hook
In a class component we can use lifecycle methods such as: `componentWillMount`, `componentDidMount`, `componentWillUnmount`

In a functional component, we don't have such methods, but we can use `useEffect` and accomplish something _like_ lifecycle methods

```javascript
useEffect(() => {
  // first argument - callBack function or also called side effect we want to invoke

  return () => {
    // anonymous cleanup function
  }
}, [dependencyArray])
```

It's handy to think that `useEffect` is an _after render action_

The callback code inside `useEffect` cannot be async, because it will break the rule of _hooks must be called in identical order with each re-render_

The dependency array tells **when** the callback function should run. The thumbs rule is:
```
[] / empty array => Callback fn will be invoked when render the first time
...              => Callback fn will be invoked when render the first time and on a re-render
[data]           => Callback fn will be invoked when data is updated
```

`useEffect` might need to cleanup its side effect, use `return` to do a cleanup. So... the cleanup function is optional.

### The useRefHook
Used to attach a direct reference to a DOM node, or to stash a piece of data that we expect to change but whose change we do not want to trigger a costly re-render.

Returns `current` a reference to whatever `ref` is.

```javascript
const ref = useRef();

// Then assign it
return <div ref={ref}> ... </div>

// returns
ref => a mutable object with one property `current`, pointing to a dome node or piece of data
```

#### SOURCE Link
[A Quick Guide to Understanding React Hooks](https://dev.to/ash_bergs/a-quick-guide-to-understanding-react-hooks-4o1)

