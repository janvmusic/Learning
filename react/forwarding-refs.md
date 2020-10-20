## Forwarding Refs
Ref forwarding is a technique for automatically passing a ref through a component to one of its children. Typically this is not required.

### Forwarding refs to DOM components
- React components hide details of it's implementation
- This is good because components wont rely on implementations too much
- This `ref` forwarding is good for reusable components
- **Ref forwarding** is a opt-in feature that lets you pass down a ref they receive
```javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

const ref = React.createRef();
<FancyButton ref={ref}>Click me! </FancyButton>;
```
- This is what happens:
  1. Creates a `ref` by calling `React.createRef`
  2. Pass `ref` down as prop `<FancyButton ref={ref}...`
  3. React passes `ref` as part of function `forwardRef`
  4. `button` receives `ref`
  5. When `ref` is attached `ref.current` will point to `button`

- `ref` argument needs to be used inside a `React.forwardRef` component

### Forwarding refs in high-order components
- This technique can also be particularly useful with higher-order components
```javascript
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}
```
- The `logProps` HOC passes all the _props_ through the component it wraps.
```javascript
class FancyButton extends React.Component {
  focuts() {
    // ...
  }

  // ...
}

// Rather than exporting FancyButton, we export LogProps
// It will render a FancyButton though
export default logProps(FancyButton);
```
- However, in this example we have no access to `refs`
- `ref` is not a prop!
```javascript
import FancyButton from './FancyButton';

const ref = React.createRef();
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
```
- Now we are passing `ref` as part of our `FancyButton`
- How we get the `ref` prop ? Of course `forwardRef`!
```javascript
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      
      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />
    }

    return React.forwardRef((props, ref) => {
      return <LogProps {...props} forwardedRef={ref} />;
    });
  }

  return LogProps;
}
```


