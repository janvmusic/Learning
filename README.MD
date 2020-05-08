### JS Grammar
Condensed knowledge for Javascript

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
- Available since **ECMAScript 5**
- This _Strict contexts_ prevents certain actions from being taken and throws an exception
- Example: In _strict_ mode you cannot use undeclared variables
- In _strict_ mode you become aware of more errors.
- _Strict_ mode can be delimited to certain scopes, not only to **Global**; Besides would be better to limit it's scope to the current function.
- Using _Strict_ mode is a good practice

#### 3.3 - Literal Values
- Literal representation of a number, boolean, text & so on
- Operations available (+,-,/,*, etc)
- Variable types: number, string, [], {}, boolean, function
- Javascript function can be used as values or parameters to other functions. These are called `function expression`
- It's uncommon to use constructors for primitive values; However use the literal notation

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
- `Number` they are part of the numeric domain (positive, negative, floats, infinity)
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

### Chapter 6 - Type coercion madness
- When `+` operator finds objects of incompatible type, it will attempt to _coerce_ those objects to their valies in string format
- If `+` finds a string, this type will take precedence
- Besides operators, _Type coercion_ could happen in constructors
```javascript
  let a = Boolean(true); // true
  let a = Boolean([]]); // true
  let a = Boolean({}); // true
```
- Javascript will try to coerce to an ideal value specific to that type
- **Coercion** is the process of converting a value from one type into another
- `==` tests objects by reference, not by value
- Javascript will often coerce different types to its **string** or **number** value
- If during operation, Javascript discover that the types are different then will use _type coercion_ to change one of the values before performing the operation
- Javascript uses three types of `+` operators: _unary_, _arithmetic_ & _string_
- Operators evaluate from _left_ to _right_
- One exception of this rule is `assignation` which evaluates from _right_ to _left_
- When adding _numbers_ and _strings_ `arithmetic` operators takes precedence
- However, Javascript prefers to coerce to string before number (in addition operation)
- For _multiplication_ the coercion occurs from string to number. Remember `3 * "" => 0`
- _null_ => value is empty
- _undefined_ => value is not assigned
- Avoid using **undefined** as initial value, prefer **null**

#### 6.0.1 Examples of type coercion
- Javascript will try to come up with best value available if you supply meaningless combinations of types to some of its operators
- Usually this wont happen in prod code, however is good to know this

### Chapter 7 - Variables
#### Variable definitions: Case sensitive
- Variables are case sensitive; variable `A` is not the same as variable `a`
- You can define a variable using `var`, `let` or `const`
- If you try to use a variable that wasn't defined you would get a _ReferenceError_
- _Global scope_ variables are propagated into all inner scopes
- _Global scope_ is also **window** when using `var` definition, let does not attach variables to window
- Hoisting: _placed on to of_ or _raised_
- Hoisting is limited to `var`
- Using `let` or `const` variables means that these elements only exist in the scope that they were declared
- `var` elements declared in _function level_ remains in the level in which they were defined
- Hoisting is a safety element for Javascript

#### Functions declaration
- Function names are also hoisted;
- You can call a `function` as long is defined at some point
```javascript
fun();

function fun() {
  console.log("This function is going to be hoisted")
}
```
- _Functions_ can be assigned to variables; these functions are not going to be _hoisted_
- Named functions:
```javascript
function fun() { 
  // something here 
}
```
- Anon functions:
```javascript
var fun = function() { 
  // something here 
}
```
- If we have 2 functions that share names, the last defined will take precedence
- Functions are hoisted first!!!!!!

#### Declaring variables inside inner scope
- When declaring a variable inside an inner scope, it's defined inside this scope, it goes inn but not out
- Parent scope has no visibility to variables inside inner blocks;
- Closure pattern: Protect/hide variables from global scope, but still be able to use variables; Something like encapsulation

#### Variable types
- _Variable types_ can change during runtime
- Reserved words _let_, _const_ or _var_ does not determine it's value type
- `const` & `let` only exists in the declared scope
- `var` is deprecated, uses _window_ & right now is used to support legacy

#### Scope visibility
- When a variable is declared in the _global scope_ there's no difference between declare a variable using `let`, `const` or `var` (Talking about scope). They all propagate to innser scopes
- `const` & `let` are not hoisted, `var` yes
- All variables remain limited to their scope
- A _function closure_ is a function trapped in another function
- `Functions` inside `Functions` are concealed/hidden from global scope

#### Scope in classes
- `Class` scope is simply a placeholder
```javascript
class Cat {
  let age  = 0; // Unexpected token exception
  this.age = 0; // Unexpected token exception
}

class Cat {
  constructor() {
    let age   = 1;
    this.name = "Misifu";
  }

  getGeneralInformation() {
    console.log(this.age);
    console.log(this.name);
  }
}
```

### ES6 Const
- `const` keyword is different than `let` and `var`
- `const` **cannot** be reassigned
- `const` **requires** to be assigned or has initial value
```javascript
  const a = []
  a[0] = 'A'; // valid
  a = []; // TypeError: Assignment to constant value
```
- Same as arrays, const allows you to modify values in an object


### Chapter 8 - Arithmetic
- Same as Java
- `%` returns the number of times one numbers into the other. It's often used to determine the remainder
- For numbers these operators `=, +=, -=, *=, /= %=` allows you to assign values
- For strings these operators help you to perform these:
  - `=` string assignment
  - `+=` concatenation
  - `+` addition

#### 8.0.4 Comparison
- `==` means equality
- `===` means equality of value and type
```javascript
  1 == '1' // returns true
  1 === '1' // returns false
```
- `!=` inequality
- `!==` inequality of value and type
```javascript
  1 != '1'// returns false
  1 !== '1' // returns true
```
- `>, <, <=, >=` works as Java

#### 8.0.5 Logical
- `&&, ||, !` same as Java
- _Bitwise_ operators... 

#### 8.0.7 typeof
- This operator `typeof` is used to check the type of a value. The return value of this is a string
```javascript
  typeof 125 // returns number
  typeof 'hola' // returns string
```
- `NaN` evaluates to number. `NaN` lives in _Number.NaN_

#### 8.0.8 Ternary
- Same as Java
```javascript
  1===1 ? doSomething() : doOtherThing();
```

#### 8.0.9 Delete
- To remove a property from an object use the operator: `delete`
```javascript
  let bird = {
    name: 'Raven',
    speed: '30mpg'
  };

  console.log(bird);
  delete bird.speed;
  console.log(bird);
```
- You cannot remove _stand alone_ variables

#### 8.0.9 in
- Looks for a property name inside an object
```javascript
'c' in { 'a': 1, 'b': 2, 'c': 3} // returns true
'c' in { 'a': 1, 'b': 2, 'c': 3} // returns true
```
- When used in _arrays_ the `in` operator checks if an index exists
```javascript
'c' in ['a','b','c','d'] // returns false
0 in ['a','b','c','d'] // returns true
```
- You can check for properties build-in data types
```javascript
  'length' in [] // returns true
  'length' in [1, 2, 3] // returns true
  'length' in {} // returns false
  'length' in { length: '2' } // returns true
```
- Checks for the presence of `constructor` or `prototype`
```javascript
  'Constructor' in Object // returns true
  'prototype' in Object // returns true
```

### Chapter 9 - ...rest and ...spread
- The `...rest` syntax assumes you have more than element
- The single `...rest` parameter assumes you have one or more parameter passed to a function
```javascript
  ...pigs => pigs.map(bacon => console.log(bacon));
  
  let f = (...items) => items.map(item => console.log(item));
  f(1,2,3,4,5) // results in see in console 1 2 3 4 5 printed
```
- `=>` refers as **Arrow Function**
- Shorter code but less understandable
- _Remember, if you are working on a team, another person might be reading your code. Sometimes that person will be you in the future_
- You can think `...spread` as opposite of of `...rest`
- `...spread` can help you to extract parts of an object.
- _Rest & spread_ are not syntax operators, they are assign operators
- _Spread_ operator **expands** iterables into one or more argument
- _Rest_ operator **collects** all the rest parameters into an array
- **Rest** parameters cannot appear as leading/middle parameters if we have more arguments/parameters
- **Rest** parameters must be unique or last
```javascript
  function sum(...args, b, c) {} // error
  function sum(a, ...args, c) {} // error
  function sum(a, b, ...args) {} // good
  function sum(...args)       {} // good
``` 
- Check the following examples:
```javascript
  sum([1, 2, 3]) // Consoles out: Array(3)
  sum(...[1,2,3]) // Consoles out: [1,2,3]
```
```javascript
  function print(a, ...args) {
    console(a);
    console(args);
  }

  print([1,2,3,4], 2, 9) // here we use the spread
  // a = 1 because 2,3,4 are the REST 
  // args = 2,3,4,2,9
```
- Flattening arrys with `...spread`
```javascript
  let names = ['felix', 'luna'];
  const cats = [...names, 'Sol']
  console.log(cats)


  let a = ...[1,2,3] // causes an error
```

#### Destructuring assignment
- `Destructuring assign` can be used to extract elements from `[arrays & objects]` and assign it to variables 
```javascript
  [a, b] = [10, 20] // this expression is the same as var a = 10;
  console.log(a); // prints 10
  console.log(b); // prints 20 
```
- when `var, let or const` is not mentioned `var` is the default
```javascript
  [a] = 10; // var is assumed
  [a, b, ...rest] = [30, 40, 50, 60, 70];
  // a = 30;
  // b = 40
  // rest = 50, 60, 70
```
- Destructuring works on objects too
```javascript
  let oranges = { oranges: "1" } // oranges = 1
  let grapes = { oranges: "1", grapes: '2' } // grapes = 2 Does not matter the order
```
- Destructuring for inner object is not explicit but possible
```javascript
  let perros = {
    manada: {
      casa: {
        coco: 'coco',
        negrita: 'negrit'
      }
    }
  }

  let { coco, negrita } = perros.manada.casa
```
- If a variable is not found in the object, then it uses `undefined`
- You can use* **spread** to easily merge objects or arrays
```javascript
  let a = { p: 1, q: 2 };
  let b = { r: 3, s: 4 };
  let c = { ...a, ...b }; // { p: 1, q: 2, r: 3, s: 4 }

  let a1 = [1,2];
  let b1 = [3,4];
  let c1 = [...a1, ...b1]; // [1, 2, 3, 4]
```
- `Spread` allows deep copies

### Chapter 10 Closures
- After a function is called, Javascript keeps track of all variables that were used
- _Closures_ enables you to keep a reference to all local function variables in the state they were found after the function exited
- Remember: in Javascript you can define a function inside another function (Technically this is a closure)
- Closure inner execution context
- In Javascript, inner functions have access to variables defined in the code of the function in which they are defined
- We can expose "private" functions by returning the function
```javascript
function sendEmail(from, sub, message) {
  let msg = `my message ${message}`;
  let send = function() { console.log(msg) }
  return send;
}

let refToSend = sendEmail('Professor Farnsworth', 'Re: subject;', 'Good news everyone!')
```
- _Closures_ are used in functional programming the same way in OOP we use private methods
- _Closures_ provide a method API to an object in the form of a function
- Whenever a function is declared inside another function, a closure is created
- When a function containing another function is called, then a new execution context is created.
- **Note**: _new Function()_ does not create a new closure. Objects created with the keyword **new**

#### 10.0.1 Arity
- **Arity** is the number of arguments that a function takes
```javascript
function f(a,b,c) {} // 3 parameters
let arity = f.length;
console.log(arity) // 3 as result
```
#### 10.0.2 Currying
- In Javascript functions are expressions. This also means a function can return another function.
- A **curried** function can be constructed by chaining closures by defining and immediately returning all inner functions at the same time

### Chapter 11 Loops
- Iterating: the act of repeat the same action **n** number of times
- Array is iterable while Object, no.
- Enumerable types do not guarantee the order in which properties will appear when iterated
- Types of loops: `for`, `for...of`, `for...in`, `while` & `Array.forEach`
- Some **Array** methods are considered to be iterators: `.values`, `.keys`, `.map`, `.every`, `.some`, `.filter` & `.reduce`,


#### Reduce
```javascript
  let miles = [5, 12, 75, 2, 5];

  let A = 0;
  for (let i = 0; i < 5; i++) {
    A += miles[i];
  }

  console.log(A); // returns 99
```
- You can use `Reduce` function to use high order functions
```javascript
  const R = (accumulator, value) => accumulator + value;
  const result = miles.reduce(R);
  console.log(result); // returns 99
```

#### 11.1 Loops
- Contains 3 basic elements;
- **initialize**: `i = 0`;
- **test condition**: `i < 5`;
- **increment/decrement**: `i++`;
- Remember that most of the _List_ elements are based on a **0 index**
- **Multiple statements**: You can call several functions during an iteration using `comma`
```javascript
  let counter = 0;
  function inc() {
    counter++;
  }

  for (let i = 0; i < 10; i++, inc());
  console.log(counter); // returns 10;
```
- `let` elements need to be enclosed by brackets when used in a `for` loop
```javascript
  for (let i = 0; i < 10; i++) let x = i; // throws an error
  
  for (let i = 0; i < 10; i++) {
    let x = i; // it works!
  } 
```
- Javascript allows nested looks
- As in Java, you can use `continue` keyword to skip one iteration
- As in Java, you can use `break` keyword to get out of loop execution
- None of the 3 basic elements are required, you can use `;;` and move the context to the loop body
- You can use `labels` in Javascript. This is interesting
```javascript
  let c = 0
  mark: for (let i = 0; i < 5; i++) {
    inner: for(let j = 0; j < 5; j++) {
      c++;
      if (i === 2) {
        break mark;
      }
    }
  }
  console.log(c); // returns 11
```
```javascript
  let c = 0
  mark: for (let i = 0; i < 5; i++) {
    inner: for(let j = 0; j < 5; j++) {
      c++;
      if (i === 2) {
        break inner;
      }
    }
  }
  console.log(c); // returns 21
```
- All the instructions called after `break`/`continue` keywords are going to be ignored
```javascript
block: {
  console.log("before");
  break;
  console.log("after");
}
```
#### 11.2 for...of Loop
#### 11.2.1 for...of Loop + Generators
- **Generators** are function declared with a `*`. They can `yield` and can execute several likes by parts, not following all the lines
```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

for (let value of generator()) {
  console.log(value);
}

// prints: 1, then prints 2, then prints 3
let generator = generator();

console.log(generator.next().value); // prints one
console.log(generator.next().value); // prints two
```
- **Generators** are one-time use functions. you should not attempt to reuse a generator fiunction more than once. They are not a regular functions!!

#### 11.2.1 for...of Loop
- `Strings` are **iterables**, you can walk each character using a `for...of` statement
```javascript
  let heroName = 'Jotaro Joestar';

  for (let character of heroName) {
    console.log(character);
  }
```

#### 11.2.3 for ... of and Arrays
- `for...of` it the equivalent to `for each` in Java
```javascript
  let array = [0,1,2];
  for (let value of array) {
    console.log(value);
  }
```

#### 11.2.3 for ... of and Objects
- `Objects` in Javascript are not iterables
- `Objects` has enumerable properties
- As remedy for this, we can use `Objects.keys`, `Objects.values` or `Objects.entries`
```javascript
  let enumerable = { property: 1, method : () => {} };

  for (let key of Object.keys(enumerable)) {
    console.log(key);
    // Will print: method, property.
    // Because those are the keys in the enumerable object
  }

  for (let value of Object.values(enumerable)) {
    console.log(value);
    // Will print: 1, () => {}
    // Because those are the values in the enumerable object
  }

  for (let entry of Object.entries(enumerable)) {
    console.log(entry);
    // Will print: [property, 1] & [method, f]
    // Because those are the tuples in the enumerable object
  }
```
- This can be also achieved using `for...in` loop, this will help to avoid use any of the Object conversion method

#### 11.3 for ... in
- `for ...of` loops only uses iterables. Remember Objects are _enumerables_
- `for ...in` loops work with _enumerables_ object properties
```javascript
  let object = {
    a: 1,
    b: 2,
    c: 3,
    method: () => {}
  }

  for (let value in object) {
    console.log(value, object[value]);
    // This will print 
    // 1
    // 2
    // 3
    // () => {}
  }
```
- Not all objects properties are enumerable even if they exist on the object.
- `for...in` will skip all non `enumerable` properties
- `constructor` and `prototype` are not enumerable

#### 11.4 While loops
- **While** loops will iterate until the condition becomes false
- You can use secondary conditions to break **while** earlier if needed
```javascript
  let c = 0;
  while (c++ < 5) {
    console.log(c);
  }
```

#### 11.4.1 While and continue
- **Continue** keyword can be used to skip steps.
- However if you need earlier termination, use break

### Chapter 12 Arrays
- Most of the methods in `Arrays` are iterators.
- `Array` methods are **attached** to _Array.prototype_ property
- You can used them like:
```javascript
  [1,2,3].forEach();
```

#### 12.0.1 Array.prototype.sort()
- Previous `ES-10` V8 used an unstable version of quick sort algorithm
- A stable algorithm is when 2 objects with equal keys appear in the same order in the sorted output as in the unsorted input.

#### 12.0.2 Array.forEach
- This method will execute a function for every item in the array
- Before ES6.
```javascript
  let fruit = ['pear', 'banana', 'orange', 'apple', 'pineapple'];
  let print = function (item, index, object) {
    console.log(item);
  }

  fruit.forEach(print);
```
- `forEach` received 3 parameters **item, index & object**
- In ES6 you can use this method, using arrow functions:
```javascript
  fruit.forEach((item, index, object) => {
    console.log(item, index, object);
  });
```
- ES6 Slim form
```javascript
  fruit.forEach(item => console.log(item));
```
- As long as you have only one statement, you can remove brackets.

#### 12.0.3 Array.every
- This method evaluates for something that all items in the array has it
- Uses `short circuit` logic, so breaks when we get first _false_
- `Array.every` will not modify the original array. Uses a **copy** not a reference

#### 12.0.4 Array.some
- This method evaluates for _true_ if one element accomplishes the condition
- Uses **short circuit** logic.
- Note: this is not the opposite of `Array.every`

#### 12.0.5 Array.filter
- Return a new set of elements after applying a condition
```javascript
  let numbers = [0,10,2,3,4,5,6,7];
  let condition = value => value < 10;
  
  let filteredElements = numbers.filter(condition);
  console.log(filtered); // [0,2,3,4,5,6,7]
  console.log(numbers); // array unchanged
```

#### 12.0.6 Array.reduce
- Returns an accumulator
- The `accumulator` value must be returned
- There are different types of accumulators.
- As any other method that uses `iterables` **reducer** has access to current value (currentValue)
- `Array.reduce` vs `Array.filter`? `reduce` is the father of `filter` & `map`
- Anything done by `filter` or `map` can be done with `reduce`
- Use `reduce` when the return type is the same as the `input items`
- Do use it:
  - Sum or multiply numbers
  - Update state in react
- Do NOT use it
  - Building a new list or objects from scratch
  - For anything else, use A LOOP!
  - To mutate original input arguments
  - To perform side efects, like call APIs and routing transitions
  - To call non-pure functions, like **Date.now()** or **Math.random()**

#### 12.0.10 Array.flat
- Flattering multi-dimensional array
```javascript
  let multi = [1,2,3,[4,5,6,[7,8,9,[10,11,12]]]];
  multi.flat(); // [1, 2, 3, 4, 5, 6, Array(4)]
  multi.flat().flat(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, Array(3)]
  multi.flat().flat().flat(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  multi.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

#### 12.0.11 Array.flatMap
```javascript
  let array = [1,2,3,4,5];
  array.map(x => [x, x * 2]);

  /* Result of this
    [1, 2]
    [2, 4]
    [3, 6]
    [4, 8]
    [5, 10]
  */

  array.flatMap(v => [v, v * 2]);
  // [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
```

#### 12.0.12 String.prototype.matchAll()
- Match multiple patterns in a string it's a common problem
- Capturing groups in regrex is sumply extracting a pattern from parenthesis
- You can capture groups using _/regex/.exec(string)_ and with _string.match_
- `(pattern)` -> This means **capture group**
- `(?<name>pattern)` -> means capture group property on resulting object
- To create a **group name** prepend `?<name>` between brackets and voila!!
```javascript
  const input = 'black*raven lime*parrot white*seagull'
  const regex = /(?<color>.*?)\*(?<bird>[a-z0-9]+)/g;

  while (match = regex.exec(input)) {
    let value = match[0];
    let index = match.index;
    let input = match.input;

    console.log(`${value} at ${index} with '${input}'`);
    console.log(match.groups.color);
    console.log(match.groups.bird);
  }
```
- If you remove `/g` from the regex, thsi will cause a infinite loop
- Good reasons to use `.matchAll()`
  1. Elegant when using capture groups
  2. Returns iterator instead of array
  3. Iterator can be converted to array using spread operator
  4. Avoids using `/g` expressions
  5. RegEx object changes internal `.lastIndex` property.
```javascript
  let iterator = "hello".matchAll(/[el]/);
  for (const match of iterator) {
    console.log(match); // does not require /g
  }
```

```javascript
  const string = 'black*raven lime*parrot white*seagull';
  const regex = /(?<color>.*?)\*(?<bird>[a-z0-9]+)/;
  
  for(const match of string.matchAll(regex)) {
    let value = match[0];
    let index = match.index;
    let input = match.input;

    console.log(`${value} at ${index} with '${input}'`);
    console.log(match.groups.color);
    console.log(match.groups.bird);
  }
```
- Do use `string.matchAll` intead of `regex.exec` and use `string.match` with `/g` flag.

#### 12.0.14 Comparing 2 Objects
- `==` and `===` compares by reference, so it's no good for _objects_ because we need to compare them by value
```javascript
  [] === []; // return false by value
  let x = [];
  x === x; // return true by reference
```
- So, if you want to compare objects. Write, your own function
```javascript
// Shallow copy object comparison algorithm
export default function objectEquals(a, b) {
  let A = Object.getOwnPropertyNames(a);
  let B = Object.getOwnPropertyNames(b);
  
  if (A.length != B.length) {
    return false;
  }

  for (let i = 0; i < A.length; i++) {
    let propName = A[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}
```
- Previous solution does not compare `objects` or `arrays`
- Also properties attached are not checked
- To compare an array:
```javascript
  function is_array(value) {
    return typeof value.reduce == 'function' &&
           typeof value.filter == 'function' &&
 	   typeof value.map    == 'function' &&
           typeof valye.length == 'number';
  }
```
- We will also need arrcmp!
```javascript
  let a = [1,2];
  let b = [1,2];
  let c = [5,5];

  function arrcmp(a,b) {
    if (!(is_array(a) && is_array(b))) {
      return false;
    }

    if (a.length != b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }
```
- Javascript **DOES NOT** have a built in function to compare arrays
- Javascript **arrays** does not always guarantee integrity between its values and indexes they are stored at.
```javascript
// Shallow copy object comparison algorithm
export default function objectEquals(a, b) {
  let A = Object.getOwnPropertyNames(a);
  let B = Object.getOwnPropertyNames(b);
  
  if (A.length != B.length) {
    return false;
  }

  for (let i = 0; i < A.length; i++) {
    let propName = A[i];
    let p1 = a[propName];
    let p2 = b[propName];

    // Property points to an array
    if (is_array(p1) && is_array(p2)) {
      if (!arrcmp(p1,p2)) {
        return false;
      }
    } else if (p1.constructor === Object &&
               p2.constructor === Object) {
        if (!objcmp(p1,p2)) {
          return false;
        }
    } else if (p1 !== p2) {
      return false;
    } 
  }

  return true;
}
```

### Notes & Concepts
- Hoisting: default behavior of moving all the declarations at the top of the scope before code execution. Functions and variables are moved to the top before it's execution
- Hosting: assigning values to variables that don't exist, creates a variable in global scope.
- Marshalling: convert objects from memory to a format that can be written to disk
- `var` can cause hoisting bugs, prefer to use `let` or `const`
- **High-order functions**: because they take another function as argument or return a function
- **Rendering** is the act of displaying something in the screen
