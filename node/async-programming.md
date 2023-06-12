## JavaScript Asynchronous Programming and Callbacks

Javascript is synchronous by default, and is single threaded.

Javascript cannot create threads and run in parallel.

### Asynchronicity in Programming Languages

Computers are asynchronous by design

**Asynchronous** means that things can happen independently of the main program flow.

In the current consumer computers, every program runs for a specific time slot and then it stops its execution to let another program continue their execution

Programs internally use _interrupts_, a signal that is emitted to the processor to gain the attention of the system

### Callbacks

A callback is a function that is to be executed after another function has finished executing

It's a simple function that's passed as a value to another function, and will only be executed when the event happens.

Javascript has **first class functions** which can be assigned to variables and passed around to other functions (called **higher order functions**)

### Handling errors in callbacks

Node implements that the first parameter of a callback function should be reserved for an error object

### The problem with callbacks

Callbacks are great for simple cases

However every callback adds a level of nesting, and when you have lots of callbacks, the code starts to be complicated very quickly
