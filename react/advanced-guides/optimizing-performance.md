## Optimizing Performance
### Use the production build
- Development mode includes useful warnings while Production mode, no
- You can verify this with their app
- Files with the suffix `.production.min.js` are in production mode
- `uglyfyify` removes development imports
- `webpack` to minify your code

### Virtualize long lists
- If you app renders a long list of data, it will help you to use `windowing`
- `windowing` renders a small subset of your rows at any given time.
- This reduces render time and DOM elements created
- `react-window` or `react-virtualized` are common libraries for this

### Avoid reconciliation
- **React** builds & maintains an internal representation of the rendered UI
- Usually called `Virtual DOM`
- Calling direct DOM elements is a expensive operation
- Any delta React detects then replaces the DOM element by the virtual DOM
- `shouldComponentUpdate` is called before the re-render process starts
- You can override `shouldComponentUpdate` to be selective on when to re-render a component
- You can inherit from React.PureComponent. This will be equivalent to `shouldComponentUpdate`

### shouldComponentUpdate in action
- React uses a way similar process to know that a node `needs update`
- It uses `vDOMEq` to know if a node its equal instead of just trust `shouldComponentUpdate`
- Inheriting from `React.PureComponent` it performs a _shallow comparison_ from props & state

### The power of not mutating Data
- Avoid mutating state or props directly
- You can always use `...spread`
```jsx
class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => {
      // This section is bad style and causes a bug
      const words = this.state.words;
      words.push('marklar');
      this.setState({words: words});
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```
- What alternatives are there to fix data mutation?
```jsx
handleClick() {
  this.setState(state => ({
    words: state.words.concat(['marklar'])
  }));
}

handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};
```
- Remember to prefer functions that creates a new object instead of mutating existing ones