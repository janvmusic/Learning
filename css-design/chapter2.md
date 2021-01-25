## Chapter 2 - Pseudo Selectors and Elements
### 2.1 Pseudo elements
- These elements start with `::`
- These elements don't refer to explicit DOM elements

#### 2.1.1 After
```css
p::after {
  content: "Added after"
}
```
![After](img/chapter2/after.png)

#### 2.1.2 Before
```css
p::before {
  content: "Added before"
}
```
![After](img/chapter2/before.png)

#### 2.1.3 ::first-letter
- Will affect only the first letter inside `<p>`
```css
p::first-letter { font-size: 200%}
```

#### 2.1.4 ::first-line
- Will apply CSS to the first line only
```css
p::first-line { text-transform: uppercase; }
```

#### 2.1.5 ::selection
`::selection` will affect the look on how text selection shows up
```css
::selection {
  background: black;
  color: white;
  caret-color: blue;
}
```

#### 2.1.6 ::slotted(*)
- Only works on `template` HTML element
- Could be `::slotted(*)` or `::slotted(element-name)`
- It will affect `<slot>` elements only
```html
<template>
  <div>
    <slot name="animal"></slot>
    <ul>
      <li><slot name="kind"></slot></li>
      <li><slot name="name"></slot></li>
    </ul>
  </div>
</template>
```

### 2.2 Pseudo selectors
- In CSS any `pseudo selector` is any selector that starts with the colon character
- Usually appended to the end of another element name. Also called pseudo classes
- `:first-child`, `:last-child` & `n-th child` are examples of this. They select the `first | last` element from a parent
- **Pseudo selectors** are effective when combining them
```css
  tr:first-child { /* Selects first row */ } 
  td:first-child { /* Selects first column */ }   
  table tr td:nth-child(2) { /* Selects a position or specific row */ } 
```
- `n-th-child` rules apply to all other _nested groups_ like `<ul>` or `<li>`

#### 2.2.1 :link
- Selects `<a>` tags with `href` element in it. Wont work otherwise 

#### 2.2.2 :visited
- Applies CSS to visited links or elements.

#### 2.2.3 hover
- Applies CSS to hover event on links.

#### 2.2.4 :active
- Applies CSS to the link which is currently on active or "pressed" link

#### 2.2.5 :focus
- Works on elements with current focus. Including _links_, _input_ & _textareas_ 

#### 2.2.6 :enabled
- Adds CSS to elements that can be activated (selected, clicked or typed into)
- Also _accept_ focus