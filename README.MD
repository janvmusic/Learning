### JS Grammar
Condensed knowledge for javascript

### Chapter 3 - Welcome to Javascript
#### 3.1 - Basics
- DOMContentLoaded    => Event used to know that the DOM elements are ready to be modified/used/deleted. It's an event Javascript uses.
- document.readyState => Variable used to check is the DOM was loaded correctly
- DOM                 => Tree like structure that contains HTML tags/elements
- DOM media elements  => Usually this type of HTML elements take more time to load than regular DOM, so be careful.
- window.onload       => Function, used to know if DOM media has been loaded.
- Include external JS => Use tag `<script src="my_file">` to load scripts outside of this file
- import/export       => Imports variables, functions and classes from a external file. `export` keyword must be prepended to the function 
- script type module  => To use any `export` we need to declare it as `module`. `<script type="module">`
- import statement    => Use `import { MyClass } from "./path/to/file.js"`; Then declare it as variable `let myVariable = new MyClass()`
- `Import / Export Multiple definitions` is available via `destructuring`
- `import { Mouse, Tiger, Dog } from 'animals.js'`

#### 3.2 - Strict Mode
- Available since *ECMAScript 5*
- This _Strict contexts_ prevents certain actions from being taken and throws an exception
- Example: In _strict_ mode you cannot use undeclared variables
- In _strict_ mode you become aware of more errors.
- _Strict_ mode can be delimited to certain scopes, not only to *Global*; Besides would be better to limit it's scope to the current function.
- Using _Strict_ mode is a good practice

#### 3.3 - Literal Values
- Literal representation of a number, boolean, text & so on
- Operations avaiable (+,-,/,*, etc)
- Variable types: number, string, [], {}, boolean, function
- Javascript functon can be used as values or parameters to other functions. These are called `function expression`
- It's uncommon to use contructors for primitive values; However use the literal notation

#### 3.4 Variables
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

#### 3.5 Passing values by reference
- Javascript uses references, not copies

#### 3.6 Scope Quirks
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

### Chapter 4 - Statements
#### 4.0.1 Evaluating Statements
- A statement is the smallest building block of a computer program
- `var, let  or const` keywords return undefined because is an assignation
- Statements _usually_ produce a value. However when there's anything to return the statement will return undefined

#### 4.0.2 Expressions
- Expressions don't have to be variable definitions, they are just literals or functions being called

### Chapter 5 - Primitive types
- Javascript has 7 primitive types: `null`, `undefined`, `number`, `bigint`, `strings`, `boolean` & `symbol` 
- `Numbers`, `booleans` & `strings` are basic units
- `Strings` can be a template string `I have {$number} of apples`
- `Boolean` are _true_ or _false_
- `null` is an object. Null has no constructor WTF?
- `Number` they are part of the numberic domain (positive, negative, floats, infinity)
- `Numbers` has an special value `NaN` (not a number)
- Using constructors return object

#### 5.0.6 Numbers
```javascript
  typeof -1 // => number
  let number = new Number(7)
  typeof number // => object
```
- To get "number" from the previous example you will need to use `number.valueOf`
- `bigint` was added in EcmaScript 10, it's not available in other versions
- `bigint` allows you to specify numbers bigger than Number.MAX_SAFE_INTEGER
- _Equality_ works among both types
```javascript
  10n === BigInt(10) // compares value & value type
  10n == 10 // uses implicit comparison

```
- _Math operators_ only work with their own type
```javascript
 200n / 10n; // 20n
 200n / 10; // Uncaught type error
```
- _Leading_ works with negatives
```javascript
 -1000n // -100n
 +1000n // Uncaught type error
```

#### 5.0.7 Numbers
- `typeof "string"` returns string 
- You can use String constructor
- however for `typeof` you need to use `string.valueOf` to determine object type

#### 5.0.8 String templates
- To create a template string you need to use backtick quotes
```javascript
  let apples = 10;
  console.log(`There are ${apples} apples in the basket`);
  // result There are 10 apples in the basket
```
- Back-tick cannot be used to define an object-literal property name
- Ternary operator uses `?` and `:` to discern between one option or the other

#### 5.0.9 Symbols
- Symbol used to create a unique key
- Does not have a constructor
```javascript
  let mySymbol = new Symbol('sym') // Type error
  let mySymbol = Symbol('sym') // symbol created
```
- Whenever you call `Symbol('sym')` a unique symbol is created
```javascript
  Symbol('sym') === Symbol('sym') // returns false
```
- Symbols can be used to define private object properties
- Used to create private properties in objects
- Private (symbol-based) properties are hidden from `Object.entries`, `Object.keys`, `iterators` & `JSON.stringify`
- Private (Symbol-based) properties can be exposed by `Object.getOwnPropertySymbol`
- Do not use `Object.getOwnPropertySymbol` it's intended for debug purposes
- You could use symbols for constants due it's unique ID
- To override the value of a symbol use: `Symbol.for('sym')` or `Symbol.keyFor('sym')`

#### 5.0.9.1 Constructors and instances
- `Constructor` who knows how to build the object
- `Instance` the actual object built by the _constructor_
- _Function_ is the constructor to create JavaScript Functions
- _Object_ has the constructor function that could be overriden by other objects

#### 5.0.10 Executing methods on primitive types
- _Parenthesis_ let you know which statement should evaluate
- When you execute a method over a primitive type, Javascript converts it to _object_
```javascript
1.toString(); // will freeze execution
(1).toString(); // Wraps the primitive type then executes the function that will return "1"
new Number(1).toString();
"hello".toUpperCase();
```
- In Javascript you can do chaining methods
```javascript
"hello".toUpperCase().substr(1,4); // returns "ELLO"
```

### Notes & Concepts
- Hoisting: default behavior of moving all the declarations at the top of the scope before code execution. Functions and variables are moved to the top before it's execution
- Hosting: assigning values to variables that don't exist, creates a variable in global scope.
- Marshalling: convert objects from memory to a format that can be written to disk
