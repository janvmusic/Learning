## Code Splitting
### Bundling
- It's the process of following imported files and merging them into a single file: "a bundle"
- This bundle can be included on a webpage to load an entire app at once
- Webpack, Rollup or Browserify.
- App Example
```javascript
// App
import { add } from './math.js';

console.log(add(16, 26));
```
- `math.js` content:
```javascript
export function add(a, b) {
  return a + b;
};
```

- bundle example:
```javascript
export function add(a, b) {
  return a + b;
};

import { add } from './math.js';
console.log(add(16, 26));
```
- React uses `Webpack` out of the box

### Code Splitting
- Bundling is great, but as your app grows, your bundle too...
- Beware of heavy 3rd party libraries you add to your app
- Code-splitting helps you with "lazy-loading"
- Remember, only load things you actually need

### import()
- The best way to use this, it's via `dynamic loading`
```javascript
// App
import { add } from './math.js';

console.log(add(16, 26));
```
- To:
```javascript
import('./math').then(math => {
  console.log(math.add(16,26));
});
```
- When `Webpack` sees this, "lazy loads" your app and this is where code splitting starts

### React.lazy
- Not available via server side rendering
- This instruction lets you render a dynamic import as a regular component
```javascript
// before
import OtherComponent from './Othercomponent';

// after
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
- With the second option, React loads the component when `render` is called
- Using `React.lazy` returns a `promise` which contains a default react component
- This instruction needs to be called inside a `<Suspense>` component. Which will let you add a fallback in case of any error
```javascript
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
```
- `fallback` props accepts anything that react can render. Basically any `React.Node`
- You can include multiple components inside `Suspense` element
- If module fails to load it will throw an error. You can handle these errors using `<Error Boundaries>`
```javascript
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

### Route-based code splitting
- This is not a easy task (code splitting). You need to choose a place and an amount 
- With all of this, we need to remember user experience as well
- This is an example of `React.lazy` based on route
```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div> Loading... </div>}>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </Suspense>
  </Router>
);
```

### Named Imports
- `React.lazy` only supports default exports.
- To solve this problem, create a new **wrapper component**, then import the component required and finally export it as **default**
```javascript
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";

// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```
