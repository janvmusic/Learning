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
#### TOPIC
content

#### TOPIC2
content

#### SOURCE Link
[Link Title](http://example.com)

