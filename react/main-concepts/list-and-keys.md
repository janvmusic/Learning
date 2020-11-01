## List and Keys
- React uses same logic to process arrays, via `map()`

## Rendering multiple components
- You can render multiple components using JSX and `{}`
- Example:
```javascript
render() {
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) => <li>{number}</li>);

  return (
    <ul>{listItems}</li>
  );
}
```

### Basic list component
- **Keys** are special string attribute you need to include when creating list of elements
- If you don't set this attribute, React will complain
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li>{number}</li>);

  return (
    <ul>{listItems}</li>
  );
}
```

### Keys
- Used to identify which items have changed
- Keys should be provided to the elements inside of an array. This will give each element an **identity**
- Remember that keys should be **unique** and preferred _string_A
- When you don't have stable keys, use _index_ as last resort!
```
const todoItems = todos.map((todo) => {
  <li key={todo.id}>
    {todo.text}
  </li>
};

// Same example but using index
const todoItems = todos.map((todo, index) => {
  <li key={index}>
    {todo.text}
  </li>
};
```
- It's not recommended to use `index` because list order might change and this will cause performance issues
- However if you don't assign keys, react will use `index`

### Extracting components with keys
- Keys only make sense with lists/arrays
```javascript
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
- Only use `keys` as part of an iteration. `map` function would be a good point

### Keys must only be unique among siblings
- Keys do not need to be globally unique
- We can use same keys when working with different element
```javascript
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    <div>
  );
}
```
- **Keys** serve as a hint to react but they don't get passed to your components. If you need to pass the key, use a different value
```
// wrong
const content = posts.map((post) =>
  <Post
    key={post.id} // this value cannot be accessed via props.key
    id={post.id}
    title={post.title}
  />
);
```

### Embedding map() in JSX
- JSX allows you to embed any expression
```javascript
function NumberList(props) {
  const numbers = props.numbers;

  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number}
        />
      )}
    </ul>
  );
}
```


