## Composition vs Inheritance
- React uses composition
- Let's you reuse code

### Containment
- Some generic boxes, usually do not know their children
- You can pass `props.children` when this happens
```javascript
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```
- Then in the parent you pass the elements you want to show
```javascript
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```
- All elements inside `<FancyBoder>` are passed
- While it's less common, you can pass as well several components
```javascript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>

      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    left={<Contacts />}
    right={<Chat />}
  );
}
```
- `Contact` and `Chat` are objects, so they can be passed to other components via `props`

### Specialization
- We can simulate specialization when we a more **specific** component render a more **generic** component
```javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog title="Welcome" message="Thank you for your visit" />
  );
}
```
- **Composition** also works on components defined as classes

### So what about inheritance?
- It's not recommended
- **Props** and **composition** brings flexibility
- If you need non UI elements, exact it to other element

