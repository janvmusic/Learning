## Overview of Blocking vs Non-Blocking

Blocking is when the execution of additional JavaScript in the Node.js process must wait until a non-JavaScript operation completes. This happens because the event loop is unable to continue running JavaScript while a blocking operation is occurring.

Blocking methods execute synchronously and non-blocking methods execute asynchronously.

```javascript
const fs = require("fs");
const data = fs.readFileSync("/file.md"); // blocks here until file is read
```

```javascript
const fs = require("fs");
fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
});
```

### Concurrency and Throughput

NodeJS uses a single thread, so **concurrency** refers to the event loop's capacity to execute Javascript callback functions after completing other work.

Any code that is expected to run in a concurrent manner must allow the event loop to continue running as non-Javascript operations, like I/O.

The event loop is different than models in many other languages where additional threads may be created to handle concurrent work.

### Dangers of Mixing blocking and non-blocking code

- Remember that it's important to be clear on what type of I/O is being used and whether it is blocking or non-blocking.
