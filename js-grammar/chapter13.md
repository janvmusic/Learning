### Chapter 13 - Function
- Javascript has 2 types of functions
  -> Regular functions
  -> Arrow functions
- `Regular Functions` can be called.
- `Regular functions` They can also act as object constructors (when used along with new operator)
- `Regular function` bound `this` keyword to the context of function called or the instance of the created object if function was used as an object constructor
- `Regular functions` have an array-like *argument* object defined in their scope. This **arguments** variable serves to hold parameters passed to the function. Even when parameters names were not included in definition
- `Arrow functions` can be called but cannot be used to instantiate objects
- `Arrow functions` can be used to define methods
- `Arrow functions` can be used as callback event functions.
- `Arrow functions` binds `this` to outer scope value
- `Arrow functions` do not have array-like arguments

#### 13.1.1 Function Anatomy
- `function` keyword + `{functionName}` + `parameters`
- `function update (a, b, c, d = "Hello")` in this definition we can se that `d` has a default value
- `return` keyword is optional.
- The `function` will return anyway once all statements in its body are done executing, even if return keyword is not specified
- ES5 => `this` keyword is bind to current context
- `Argurments` is an array-like object that contains 0-index list of arguments that were passed to the function.
```javascript
  function update (a, b, c, d = 'hello') {
    a: a,
    b: b,
    c: [],
    d: d
  }
```

#### 13.1.2 Anonymous functions
- They work as regular functions
- They are defined without name
- Used for callbacks (usually)
```javascript
  setTimeout(function () {
    console.log("Print something in 1 second");
    console.log(arguments)
  }, 1000);
```
- Can be used as well as `event interceptors`
```javascript
  document.addEventListener("click", function() {
    console.log("Document was clicked");
    console.log(arguments);
  });
```

#### 13.1.2 Assigning functions to variables
- Anon functions can be assigned to variables
- This is called `named` functions
- Doing this you separate function definition from its use
```javascript
  let print = function () {
    console.log("Print something in one second");
    console.log(arguments);
  };
```
- Call anon functions using `()` for example `print();`

#### 13.1.2 Function parameters
- **Parameters** are optionals
- You can pass other `functions`
```javascript
  function Fun(text, number, array, object, func, misc) {
    console.log(text);
    console.log(number);
    console.log(array);
    console.log(object);
    console.log(func);
    console.log(misc);
  }

  function volleyball() {
    return 'volleyball';
  }

  Fun("Text", 125, [1,2,3], {count: 1}, volleyball, volleyball()); // passed as name and execute function volleyball
```

#### 13.1.3 Checking for types
- Javascript is a dynamically-typed language. The type of a variable is determiend by its value.
- Variable definition symply assumes the type
- This can cause subtle bugs...
```javascript
  function Fun(func) {
    console.log(func());
  }

  var array = [];
  var f = function() {};

  Fun(array); // causes error because array is not a function
```
- `Safe guarding` is a good solution for this type of problems
```javascript
  function Fun(func) {
     if (typeof func == 'function') { // check first if the argument is a function
       console.log(func());
     }
  }
```

#### 13.2 Origin of `this` keyword
- `this` keyword was borrowed from C++
- `this` keyword is used to link a reference to execution context

