## Asynchronous flow control

- At it's core, Javascript is designed to be non-blocking on the main thread.
- The main thread is where views are rendered
- When the main thread is blocked, happens the infamous "freezing" of the UI
- Javascript can become a callback hell, however functions can ease this pain

### Initiator style / input

- This function will accept the original input, if any for the operation
- THe operation is an executable series of functions, and the original input will be:

  - Variables in the global env
  - Direct invocation with or without arguments
  - values obtained by the file system or network request

- Middleware functions will return another function, and a terminator function will invoke the callback.

### State Management

- State dependency arises when the input or other variable of a function relies on an outside function
  - Get value from cache, session, file, db, network, etc
  - Passed state variables to the function
- Remember that `Global` variables should be avoided

### Control Flow

- if an object is available in memory, iteration is possible, and there will not be a change to control flow
- If for example a function like `setTimeout` occurs, then instructs the CPU to store the instructions elsewhere on the bus, and the data is scheduled to be executed at a later time. Here could happen a _race condition_
