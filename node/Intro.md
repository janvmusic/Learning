# NodeJS

## Introduction to NodeJS

- A `NodeJS` app runs in a single thread
- Libraries in `NodeJS` are written using a non-blocking paradigm
- When reading a file, accessing the `db` or reading from the network, `NodeJS` does not block the thread. It will use `futures` and resume operations when the **response comes back**
- `NodeJS` can handle thousands of concurrent connections without the need of handling `threads`
- Compatible with `ES6`

```javascript
const http = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

- To run this example use `$ node {filename}.js`
- When the execution of `createServer` is completed, uses the callback. `server.listen`
- A `request event` uses `IncomingMessage` and `ServerResponse`
- These two objects are essential:
  - The first describes the request details
  - The second returns data to the caller
