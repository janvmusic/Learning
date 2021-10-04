## JSX in Depth
- JSX creates a sugar syntax to `React.createElement(component, props, ...children)`
- This
```javascript
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
- Translates to this:
```javascript
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
);
```
- If the component has no `children` you can use a `self-closing` tag: `<MyButton color="blue" shadowSize={2}

### Specifying The React Element Type
- The first part of a JSX tag determines the type of the React element
- **Capitalize** elements refers to react _components_
- If you use `<Foo />` the variable `Foo` must exists

#### **React must be in scope**
- `React.createElement` compiles to JSX
- That's why we need to `import React from 'react';`

#### **Using Dot Notation for JSX Type**
- You can refer to components using `dot notation`
- Example: `<MyComponent.DatePicker color="blue">`
- This is used when there's more than one export in your package

#### **User-defined components must be capitalized**
- Components `built-in` uses lower case, such as: `<div />` or `<span />`
- In case of components build via `React.createElement` then uses capital letters, such as: `<Foo />`

#### **Choosing the type at runtime**
- You cannot use a general expression as the React element type
```javascript
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};


function Story(props) {
  // This is wrong, JSX types cannot be expressions
  return <components[props.StoryType] story={props.story}>
}
```
- The correct way would be use capital letter
```javascript
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};


function Story(props) {
  // The right way
  const SpecificStory = components[props.storyType]
  return <SpecifyStory story={props.story}>
}
```

### Props in JSX
#### **Javascript expressions as Props**
- You can pass an expression to JSX but surround it with `{}`
- The component which receives the expression, evaluates it and then uses the final value
```javascript
<MyComponent foo={1+2+3+4} /> {/* this will be evaluated as 10 */}
```
- **Remember** `if` & `for` statements are not expressions, you cannot pass them as props

#### **String literals**
- You can use `""` or `{''}`
- Values are **HTML-unescaped**. Following expressions are equal
```javascript
  <MyComponent message="&lt;3" />
  <MyComponent message={'<3'} />
```

#### **Props defaults to true**
- If you pass no value for a prop, it defaults to `true`
```javascript
  <MyTextBox autocomplete />
  <MyTextBox autocomplete={true} />
```

#### **Spread attributes**
- If you have `props` as an Object and you want to pass this to a component you can use `spread`
```javascript
  function App1() {
    return <Greeting firstName={props.name} lastName={props.lastName} />;
  }

  function App2() {
    const props = { firstName: 'Ben', lastName: 'Hector' };
    return <Greeting {...props} />;
  }
```
- It's possible as well to override one element
```javascript
  function App1() {
    return <Greeting lang={props.lang} firstName={props.name} lastName={props.lastName} />;
  }

  function App2() {
    const lang = espanish ? 'en-MX' : 'en-US';
    const props = { firstName: 'Ben', lastName: 'Hector' };
    return <Greeting lang={lang} {...props} />;
  }
```

#### **Children in JSX**
- In JSX you can pass other components such as `<div>` or `<MyComponent>` as `props.children` 
- You can also use `string literals` inside a component
- You can mix different types of children
- Its useful for nested components
```javascript
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```
- A react component can also return an array of components
```jsx
render() {
  return [
    <li key="A"> First item </li>,
    <li key="A"> Second item </li>,
    <li key="A"> Third item </li>,
  ];
}
```

#### **Javascript expression as a children**
- You can pass Javascript expressions as a children using `{}`
```jsx
function Item(props) {
  return <li>{props.message}</li>
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key="message" message="message">)}
    </ul>
  );
}
```

#### **Function as children**
- Normally, `Javascript` expressions are evaluated to `string`, React element or a list of those things.
- You can use `props.children` to evaluate expressions/functions
- Children passed to a component could be anything, as long as it ends as **react component**
```jsx
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }

  return <div>{items}</div>
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

#### **Booleans, Null, and Undefined are ignored**
- `false`, `null`, `undefined` & `true` are valid children they just simply don't render
- However you can use that for **conditional rendering**
```jsx
  <div>{showHeader} && <Header /></div>
```
- Just remember that `falsy` elements will be rendered
```jsx
<div>
  {props.messages.length &&    <MessageList messages={props.messages} />}
</div>
```
- If you want `false`, `null`, `undefined` & `true` to be rendered remember to transform them to **string**
```jsx
<div>
  My Javascript variable is {String(myVariable)}
</div>
```