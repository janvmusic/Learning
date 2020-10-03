## Thoughts on promises
Promises are you **wrappers** over _async_ units of work.
The result of a promise its a future computation/value

### Promises states
- Pending: Still performing _async_ tasks
- Fulfilled: _async_ task was completed
- Rejected: failed at performing the task
- Settled: its the final state of the promise, either **fulfilled** or **rejected**

### Making promises
- We can create promises, using constructor and passing the function we want to execute as argument
- This function (`asyncUnicOfWork`) receives 2 arguments:
  - fulfilled
  - rejected
- **Promises** do not use _return_ statement
- Default status es: _pending_
```javascript
var promisedNumber = new Promise(function asyncUnitOfWork(fulfill, reject){
  setTimeout(function() {
    fulfill(10);
  }, 1000);
});

console.log('start');
console.log('value: ', promisedNumber);
console.log('finish');
```
- We cannot interact directly with **Promises**, they are wrappers
- Luckily promises come with a mechanism to interact with them... `then`
- `then` methods takes 2 actions:
  - onFullfiled
  - onRejected
```javascript
var promisedNumber = new Promise(function asyncUnitOfWork(fulfill, reject){
  setTimeout(function() {
    fulfill(10);
  }, 1000);
});

console.log('start');

promisedNumber.then(
  function onFulfilled(value) {
    console.log('value: ', value);
  },

  function onRejected(error) {
    console.log('error: ', err.message);
  }
);

console.log('finish');
```
- When the promise is created is sent to the `queue`, then gets executed, once ready, calls function `then`

### Breaking our promises
- If we want to reject a promise, we only call to `reject` method.
- Usually an error or problem is passed along the way
```javascript
var promisedNumber = new Promise(function asyncUnitOfWork(fulfill, reject){
  setTimeout(function() {
    reject(new Error('Could not produce number'));
  }, 1000);
});

console.log('start');

promisedNumber.then(
  function onFulfilled(value) {
    console.log('value: ', value);
  },

  function onRejected(error) {
    console.log('error: ', err.message);
  }
);

console.log('finish');
```
- Calling to `reject` method, marks our promise as `rejected`
- If we _throw_ an error inside our promise, it will be marked as `rejected`

### Sequential Flow State
- Promises not necessarily get resolved on the same order they were declared in the code
- If we want to guarantee the order we need to call `then` inside `then`... WAIT WHAT?
```javascript
var promisedNumber = new Promise(function (fulfill, reject) {
  setTimeout(() => { fulfill(10) }, 1000)
});

var promisedString = new Promise(function (fulfill, reject) {
  setTimeout(() => { fulfill('hello') }, 500)
})

console.log('start');

promisedNumber.then(
  (value) => {
    console.log('number: ', value)
    promisedString.then((value) => {
      (value) => { console.log('string:', value) },
      (err) => { console.log('error:', err.message) }
    })
  },
  (err) => { console.log('error:', err.message) }
);

console.log('finish');
```

### You are committed, 'till the end
- **Promises** are eager, which means. They will run until completion
- Promises get executed, either _we call them_ or _not_

### Deferring execution
- _on demand_ or _lazy evaluation_
- `Thunks` are functions that return values
- `Thunks` are used to defer execution

### Callback hell?
- `then` function does the following:
```javascript
// then :: ((a -> b), (c -> d)) -> Promise<b | d>

// then :: ((a -> Promise b), (c -> Promise d)) -> Promise<b | d>
```
- Promises return Promises
- `then` functions can be concatenated
```javascript
const PromisedNumber = () => new Promise(function (fulfill, reject) {
  setTimeout(() => { fulfill(10) }, 500)
})
// PromisedString :: () -> Promise<string>
const PromisedString = () => new Promise(function (fulfill, reject) {
  setTimeout(() => { fulfill(10) }, 1000)
})

console.log('start')

const AsyncPipeline = () => {
  // we don't actually need these two variables
  const promisedNumber = PromisedNumber()
  const promisedString = PromisedString()

  promisedNumber.then(
    (value) => {
      console.log('number: ', value)
      return promisedString
    },
    (err) => { console.log('error: ', err.message) }
  )
  .then(
    (value) => { console.log('string:', value) },
    (err) => { console.log('error:', err.message) }
  )
}

AsyncPipeline()

console.log('finish')
```
- `onRejects` return promises
- functions that don't return something, they return `undefined`
- We can `catch` rejected promises

### Misc
- You can use `Promise.fulfill` or `Promise.reject` to create promises

### Monads
- Functions that help you to _postpone_ the logic on runtime, they are helped by `continuations`
- Examples:
  - `map`
  - `flatMap`
  - `of`

```javascript
map :: (a -> b) -> AsyncMonad b
flatMap :: (a -> AsyncMonad b) -> AsyncMonad b
of :: (a) -> AsyncMonad a
```

#### SOURCE Link
[Thoughts on promises](https://medium.com/weekly-webtips/thoughts-on-promises-and-async-functions-javascript-37b40d0538fa)

