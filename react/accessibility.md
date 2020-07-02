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
#### Labeling
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

#### SOURCE Link
[Link Title](http://example.com)

