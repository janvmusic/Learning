### Chapter 14 - High-order Functions
- **First-order** functions are regular functions, which receives parameters and so
- **Abstraction** is the quality of dealing with ideas rather than gritty details
- **First-order** functions that applies an action
- **High-order** functions don't need to know exactly what are they going to do (abstract the details)
- **map** function is an abstraction of `for...loop`
- Examples: `Array.map`, `Array.reduce`, `setTimeout` and `addEventListener` are some good examples of **high-order** functions
- Think about solving problem theoretically without think about implementation details

#### 14.0.4 Iterators
- `Array.map` is one of the most common higher-order functions
- It takes a **function** on every item in the array
- Then returns a copy of the modified array
```javascript
  function addOne(v) { return v + 1 };

  [0,1,3,4].map(v => addOne(v));
```
- `map` function is a black box. We do not worry about it's implementation
- Hide implementation!!
- Solve the problem, abstract away the implementation
- `High order` functions: receives a function or returns a function
- **Note:** `Reduce` function uses something called **accumulator**. `Reduce` is better if you need to combine values
- Do use a `high-order` function to solve problems and understand differences between `map`, `filter` & `reduce`
- Do **NOT** use filter if you can solve your problem using reduce more efficiently

