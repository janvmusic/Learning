## ECMAScript 2015 (ES6) and beyond

- `NodeJS` is built against modern versions of V8
- By keeping up-to-date with the latest releases of this engine, it is ensured that new features are brought to `NodeJS` developers in a timely manner.
- What is included in the new releases?
  - Features that V8 considers stable, which means they are ready for production use
  - Stages features, which are enabled via: `--harmony` flag
  - In progress features that can be activated via `--harmony` flag

### Which features ship with Node.JS version by default?

- Check node.green website

### Which features are in progress?

- V8 new features are launched constantly, however, node only includes them in the next major release

```
node --v8-options | grep "in progress"
```
