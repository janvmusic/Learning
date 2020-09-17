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
-  




