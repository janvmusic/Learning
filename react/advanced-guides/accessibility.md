## Accessibility
### Why accessibility?
- Better known as `a11y`
- The basic idea goes to: _websites used by anyone_
- Uses **assisting** technology to interpret the website

### Standards and Guidelines
- WCAG: Web Content A11y Guidelines
- WAI-ARIA: Web Accessible Initiative - Accessible Rich Internet Applications
  - Note: `aria-*` HTML attributes are supported by JSX. This attributes are **hyphen-cased**

### Semantic HTML
- Using the various HTML elements to reinforce the meaning of information
- If needed to keep semantic, use `React Fragments`
```javascript
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    return (
      <dl>
        {props.items.map( item =>
          <ListItem item={item} key={item.id}
        )}
      </dl>
    );
  );
}
```
- **Fragments** does not need `props`
- **Fragments** short name is `<>` & `</>`
```javascript
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

### Accessible Forms
#### **Labeling**
- Every HTML form control needs to be labeled
  - `<inputs>`
  - `<textarea>`
  - etc
- To do this you can use `for` but in react is used by adding: `htmlFor`
```javascript
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name" />
```
- Notifying the user of error
- Error situations need to be understood by all users

### Focus control
- Ensure that your `web app` can be operated with the keyboard only
- **Keyboard focus**: refers to the current element in DOM that is selected and accepts input from keyboard
- Do not remove **Keyboard focus** outline

#### **Mechanisms to skip to desired content**
- `Skiplinks` or `Skip navigation links` are hidden navigation links that only becomes visible when page interacts with it
- Use landmark elements an roles, such as `<main>` and `<aside>` this to demarcate page regions

#### **Programmatically managing focus**
- While actively updating DOM, keyboard input references can be lost
- This is a way to fix it
```javascript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef(); // stores a ref for the text input DOM element
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <input type="text" ref={this.textInput} />
    );
  }
}
```
- Then we can use `focus` directly on DOM
```
focus() {
  // Explicitly focus the text input using the raw DOM API
  // Note: we're accessing "current" to get the DOM node
  this.textInput.current.focus();
}
```
- As well you can pass these `refs` to child via `props`
- If possible use `forwardRef` function in react

### Mouse and pointer events
- Keyboard input should be able to do the same as a mouse
- Remember the case of `click ouside the button` pattern example
```javascript
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

### Other points for consideration
- Set the Document language for the screen reader
- Set the document title that describes content of the page
- Remember to use color contrast
- `eslint-plugin-jsx-a11y` can help you to detect these type of issues
