## Portals
- First-class way to render children elements into a DOM node that exists outside the DOM hierarchy of the parent component
```jsx
ReactDOM.createPortal(child, container)
```
### Usage
- Usually when you return an element, it gets attached to closest parent DOM element
```jsx
render () {
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```
- If you need it anywhere else use `Portals`
```jsx
render() {
  return ReactDOM.createPortal(
    this.props.children,
    parentNode
  );
}
```
- _Portals_ are useful for dialogs, hover-cards & tooltips (`overflow: hidden` or `z-index`)

### Event bubbling through Portals
- It behaves like a regular DOM element
- `Contexts` works the same way
- An event fired from inside a portal will propagate to ancestors
