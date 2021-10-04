### Chapter 15 - Arrow Functions
- New feature introduced in ES6
- **Arrow Functions** providence a slim syntax for create functions expressions in Javascript
```javascript
  () => {}; // example of arrow function

  let fun_1 = () => {}; // example of a named arrow function
  fun_1(); // execution call of arrow function

  let fun_2 = () => { return 1; };
  fun_2(); // returns 2

  let fun_3 = () => 3;
  

  let fun_3 = () => 3; // return-less arrow function
  fun_3(); // returns 3, no return required
```
- Remember that Javascript functions are **expressions**
- An **expression** is a anything that returns a single value. Similar to a math equation that returns one value
 
#### **15.0.1 Arrow function anatomy**
- Arrow functions do not have array-like **arguments**
- They cannot be used as constructors
- `this` keyword points to the same value `this` points in the scope outside of the arrow function
- `Arrow functions` are expressions - they do not have named syntax (not need of **function** keyword)
- `Arrow functions` can be added to variables
```javascript
(parameters) => { 
  this; // points to this from outside
  // function here
  return true; // return statement
};
```
- You can pass **arguments** to an `arrow function` via **parameters**
```javascript
  let x = (arg1, arg2) => { console.log(arg1,arg2); };
  x(1, 2); // this will print 1,2

  // return values
  let boomerang = a => "returns"; //no explicit return required, either brackets
  let karma = a => { 
    console.log(a);
    return a; // explicit return requiredn and add brackets to perform operation
  }
```
- Most of the time you can replace regular functions by using `Arrow functions`
- Remember when defined in _global_ scope _seems_ that there's no difference between regular functions
- `Arrow functions` do not bind `this` keyword; They look it up from whatever `this` equals in the outer scope
- `Arrow functions` have a transparent scope
- Remember **arguments** do not exists in `arrow functions`
- `ES5 functions` are constructors. So when you call it using new, the `function` itself becomes a class
- `Arrow functions` cannot be used as object constructors
- `Arrow functions` inherits the lexical scope based on **where it was used**  

