### Chapter 20 - Call stack
- The **call stack** is a place to keep track of currently executing functions
- Once a function is executed it's removed from the call stack
- **pushing** / **poping** are the main tasks for the call stack
- It's backed up by the idea of `Array.push` and `Array.pop`
```
  1. [ main() ] // call stack
  2. console.log() // this function is called
  3. [ console.log() <- main()] // current state
  4. console.log() // this function is executed
  5. [ main() ] // call stack
```
- The **call stack** is a fundamental building block of computer language design
- Most languages implements a call stack in one way or another
- Call Stack example:
  - Complex tasks have priorities
  - Many things need to have to be done in a logical order
  - Often **a function** is **called** inside another function
```javascript
function mopFloor() {
  console.log("Mop the floor");
  throw new Error("Ran out of water");
}

function fillBucket(what) {
  console.log("Filling bucket with " + what);
  mopFloor(); // Calls previous function
};

function cleanHouse() {
  console.log("Cleaning house");
  fillBucket("water"); // call a previous function
}

cleanHouse();
```
- Calling `cleanHouse` function triggers a chain of function calls
- Errors displays the `stack trace` of the call stack history


#### 20.1 Execution context
- The call stack is a stack of **execution contexts**
- `this` keyword is often linked to the current **execution context**
- **Root execution context**
  - When browser is open **window** object is created
  - This **window** becomes root execution context
  - **window** is the context called _global scope_ 
  - **window** object is an instance of `Window` class
  - `this` keyword is pointed to `window` context
  - The **execution context** is carried over from one scope to another (It's like a tree with several branches)

#### 20.2 Execution context in code
- The closest a dev gets to the execution context is through keyword `this`
- The execution context is held by `this` keyword in each scope

#### 20.2.1 Window / Global scope
- When `window` object is created we get a new **lexical environment**
- **lexical environment** holds all our variables, it's an actual space in memory
- `this` keyword points to **global scope**

#### 20.2.2 The call stack
- The **call stack** keeps a track of function calls.
- If you call a function from **global** scope, a new entry will placed on top
- The newly created stack will inherit execution context from previous environment
- `this` keyword is linked to current context
- There's always a _current_ **execution context**; This context it's at the top of the stack
- After a function is completed the **execution context** is removed from the stack
- The _stacking of contexts_ only occurs when you call a function inside another function

#### 20.2.3 call, bind, apply
`.call()`, `.bind()`, `.apply()` can use a different context, overriding default value for the `execution context`

#### 20.2.4 Stack overflow
- Just remember, memory is not infinite.
- Thanks for reading!!!

