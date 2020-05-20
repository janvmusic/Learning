### Chapter - 10 Closures
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

