## The V8 JavaScript Engine

- V8 is the name of the JS engine that powers Google Chrome
- V8 provides the runtime environment which Javascript code runs.
- Meanwhile the browsers provides DOM & API to web platforms.
- V8 engine parses and executes Javascript code.
- The cool thing is that Javascript engine is **independent of the browser**

### Other JS engines

- Firefox uses SpiderMonkey
- Safari uses JavaScriptCore (also called Nitro)
- Edge uses Chakra but recently uses V8 Engine

All those engines implements the ECMA ES-262 standard.

### The request performance

- V8 is written in C++
- V9 is portable and runs on Windows, Linux, Mac OS and other systems

### Compilation

- Javascript is considered a **high-level language**, which mean it's interpreted
- Moderns Javascript engines not longer just interpret Javascript, they compile it
- To compile Javascript, the engine uses a **just-in-time (JIT)** compiler
