## Fragments
A common pattern in React is for a component to return multiple elements. 

**Fragments** let you group a list of children without adding extra nodes to the DOM

### Motivation
- `Table` elements needs to include several `td` elements
- Example
```javascript
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}

class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```
- As you could see, the `div` element is not good.
- **Fragments** will solve this issue:
```html
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

### Usage
- Use `<React.Fragment>{children}</React.Fragment>`
- For short syntax use: `<>{children}</>`
```javascript
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>        
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>    
    );
  }
}
```
- Now the output will be the following:
```javascript
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

### Key fragments
- `Key` is the only attribute that can be passed to `Fragment`
```javascript
  {props.items.map(item => (
    // Without the `key`, React will fire a key warning
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ))}
```

