### Chapter 3 - Welcome to Javascript
#### **3.1 - Basics**
- DOMContentLoaded    => Event used to know that the DOM elements are ready to be modified/used/deleted. It's an event Javascript uses.
- document.readyState => Variable used to check is the DOM was loaded correctly
- DOM                 => Tree like structure that contains HTML tags/elements
- DOM media elements  => Usually this type of HTML elements take more time to load than regular DOM, so be careful.
- `window.onload`     => Function, used to know if DOM media has been loaded.
- Include external JS => Use tag `<script src="my_file">` to load scripts outside of this file
- import/export       => Imports variables, functions and classes from a external file. `export` keyword must be prepended to the function 
- script type module  => To use any `export` we need to declare it as `module`. `<script type="module">`
- import statement    => Use `import { MyClass } from "./path/to/file.js"`; Then declare it as variable `let myVariable = new MyClass()`
- `Import / Export Multiple definitions` is available via `destructuring`
- `import { Mouse, Tiger, Dog } from 'animals.js'`

#### **3.2 - Strict Mode**
- Available since **ECMAScript 5**
- This _Strict contexts_ prevents certain actions from being taken and throws an exception
- Example: In _strict_ mode you cannot use undeclared variables
- In _strict_ mode you become aware of more errors.
- _Strict_ mode can be delimited to certain scopes, not only to **Global**; Besides would be better to limit it's scope to the current function.
- Using _Strict_ mode is a good practice

#### **3.3 - Literal Values**
- Literal representation of a number, boolean, text & so on
- Operations available (+,-,/, etc)
- Variable types: number, string, [], {}, boolean, function
- Javascript function can be used as values or parameters to other functions. These are called `function expression`
- It's uncommon to use constructors for primitive values; However use the literal notation

#### **3.4 Variables**
- _Variables_ are place holders for values
- Keywords used: var, let, const
- `var` is legacy, better use `let`
- `const` represents something that wont change
- _Dynamic typing_ it means that variables created can be assigned to other values.
- In _Statically-typed_ language, such as Java, this will produce an error:
```javascript
  let exampleVariable = 2
  exampleVariable = "2" // Correct, now exampleVariable is a string
```

#### **3.5 Passing values by reference**
- Javascript uses references, not copies

#### **3.6 Scope Quirks**
- Quirk 1 => Global variables and let/const variables cannot coexist with the same name.
- Quirk 2 => `var` uses `window/this` context; `let` & `const` don't
- In _Global scope_ `this` keyword refers to `window`
- Let variables are not attached to `window/this`
```javascript
  var x = 1
  console.log(x)         // Prints 1
  console.log(window.x)  // Prints 1
  console.log(this.x)    // Prints 1

  let y = 1
  console.log(y)         // Prints 1
  console.log(window.y)  // Prints undefined
  console.log(this.y)    // Prints undefined
```

