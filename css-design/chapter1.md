## Chapter 1 - Basics
### 1.1 CSS Properties and values
#### 1.1.1 External Placement
- CSS properties can be stored in a different file. Usually `styles.css`
- They can be included in your file using:
```html
  <link rel  = "stylesheet"
        type = "text/css"
        href = "styles.css"
  >
```

#### 1.1.2 Internal Placement
- You can also include CSS directly in your file... not recommended
```html
  <style type = "text/css">
    body p {
      background: white;
    }
  </style>
```

#### 1.1.3 Inline Placement
- You can add a CSS property to the element
```html
<body style= "font-family: Arial;">
  <p>Hello World</p>
</body>
```

#### 1.1.4 CSS Grammar - Selector Syntax
- The most common selector is the HTML tag name itself
```css
body {
  /* CSS propertoes */
}
```
- As part of CSS nature, _cascading_ will occur and properties will be applied to children elements (if we don't specify their own style)
- **CSS Command**: Selector & { Property: _value_ }
```css
/* Uses # to map properties to id  */
#box {
  property: value;
}

/* <div id="box"> content </div> */
```
- `#` adds properties to a **unique** container
- Do not use `id` for all elements, but for global parent elements.
- `.` attribute is _dot selector_ for _classes_
```css
.item {
  line-height: 1.80;
}

/* 
  <ul>
    <li class="item">1</li>
    <li class="item">2</li>
    <li class="item">3</li>
  </ul>
*/
```
- The dot selector was used to add properties to elements with the same **class** name
- **Important** You can use `:root` to add default CSS properties 
```css
:root {
  /* Use arial as default, if not available use sans-serif */
  font-family: Arial, sans-serif;
}
```
- **root selector** is often used to store variables
```css
:root {
  --red-color: red
}
```
- All CSS variables needs to start with `--`
- `*` selector is somehow similar to `:root` but star selector selects absolutely all elements in the document. While `:root` only selects the document container without children
- **Important** Prefer `:root`
- Use `*` selector for _parent + children_ regarding of the type
```html
<div id="parent">
  <div>A</div>
  <div>B</div>
  <ul>
    <li>1</li>
    <li>2</li>
  </ul>
  <p>text<p>
</div>
```
```css
  #parent * {
    color: blue;
  }
```
- You can also select multiple elements using `comma`
```css
  #parent div,
  #parent ul,
  #parent p {
    color: blue;
  }
```
- Complexity of CSS code is tightly coupled with the structure of the HTML document itself.
- `!important` is dangerous and you should avoid it. It will take precedence over other CSS properties
```css
#parent * {
  color: blue;
}

#parent div {
  color: red;
}

/* Will override everything */
div {
  color: green !important; 
}
```

#### 1.1.5 Relationships between properties and values
- There are several value types. Other properties use unique values
- Usually CSS offer alternative values for the value types
```css
img {
  transform: rotate(200grad);
}

img {
  transform: rotate(1.4rad)
}

img {
  transform: rotate(0.5turn)
}
```
#### 1.1.6 CSS comment
Use `/* */` for block comments. It's the only option anyway...

#### 1.1.7 Assignment Patterns
- **shorthands** to void redundant declarations. Usually separated by `space`
```css
/* from this */
p {
  background-color: black;
  background-image: url("image.jpg");
  background-position: center;
  background-repeat: no-repeat;
}

/* to this */
p {
  background: black url("image.jpg") center no-repeat;
}
```
- Common patterns:
  - Space separated
  - key value
  - Comma separated
- Size properties pattern can use `calc`
```css
p {
  property: calc({value}px);
  property: calc({value}% - {value}px);
  property: calc({value}% - {value}%);
  property: calc({value}px + {value}px);
  property: calc({value}px - {value}px);
  property: calc({value}px * {number});
  property: calc({value}px / {number});
  property: calc({number} / {value}px); /* No ok, returns error */
}
```

#### 1.1.8 CSS Variables
- CSS allows using variables
- To declare a variable use _double dash_

##### Local Variables
- You can define local variables for a container
```css
.notifications { --notification-color: blue; }

.notifications div{ 
  color: var(--notification-color);
  border: 1px solir var(--notification-color);
}
```

#### 1.1.9 CSS Syntactically Awesome Stylesheets
- **SASS** -> CSS Preprocessor
- Filename is: `scss`
- In `SASS` variables are declared with `$`
```css
$font: Helvetica, sans-serif;
$dark-gray: #333

body {
  font: 16px $font;
  color: $dark-gray
}

$a: #E50C5E;
$b: #E16A2E;

.mixing-colors {
  background-color: mix($a, $b, 30%);
}
```

#### 1.1.10 The idea behind CSS
- It models the idea of a **waterfall**
- _Children_ elements get their properties from the _parent_ element
- The _selectors_ help us to **traverse through** elements
- Remember that CSS uses _space_ as part of the selector
```css
/* This means, look inside footer all span elements */
footer span { color: green; }
```

#### 1.1.11 CSS Selectors
```css
/* Look for elements which have id as "id" */
#id {}

/* Look for all element which have class as "class1" */
.class1 {}

/* loof for all element which have an id as "id" and have child element with class as "class1" */
#parent .class1 {}
```

#### 1.1.12 Forgiving Nature
- If CSS cannot be applied/downloading fallbacks to _fail gracefully_
