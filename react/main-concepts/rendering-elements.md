## Rendering Elements
- Unlike DOM elements, **React Elements** are plain objects
- They are cheap to create
- React DOM updates actual DOM

### Render an element into the DOM
- react need to have a `root` element where everything will be rendered
```javascript
<div id="root"></div>
```
- React applications have one **root node**; However its possible to have more than one

### Updating the rendered element
- **React elements** are immutable; 
- **React elements** represent the UI in a certain point of time

### React only updates what's necessary
- React DOM compares previous elements and update only required ones
