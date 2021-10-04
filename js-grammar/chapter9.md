### Chapter 9 - ...rest and ...spread
- The `...rest` syntax assumes you have more than element
- The single `...rest` parameter assumes you have one or more parameter passed to a function
```javascript
  ...pigs => pigs.map(bacon => console.log(bacon));
  
  let f = (...items) => items.map(item => console.log(item));
  f(1,2,3,4,5) // results in see in console 1 2 3 4 5 printed
```
- `=>` refers as **Arrow Function**
- Shorter code but less understandable
- _Remember, if you are working on a team, another person might be reading your code. Sometimes that person will be you in the future_
- You can think `...spread` as opposite of of `...rest`
- `...spread` can help you to extract parts of an object.
- _Rest & spread_ are not syntax operators, they are assign operators
- _Spread_ operator **expands** iterables into one or more argument
- _Rest_ operator **collects** all the rest parameters into an array
- **Rest** parameters cannot appear as leading/middle parameters if we have more arguments/parameters
- **Rest** parameters must be unique or last
```javascript
  function sum(...args, b, c) {} // error
  function sum(a, ...args, c) {} // error
  function sum(a, b, ...args) {} // good
  function sum(...args)       {} // good
``` 
- Check the following examples:
```javascript
  sum([1, 2, 3]) // Consoles out: Array(3)
  sum(...[1,2,3]) // Consoles out: [1,2,3]
```
```javascript
  function print(a, ...args) {
    console(a);
    console(args);
  }

  print([1,2,3,4], 2, 9) // here we use the spread
  // a = 1 because 2,3,4 are the REST 
  // args = 2,3,4,2,9
```
- Flattening arrays with `...spread`
```javascript
  let names = ['felix', 'luna'];
  const cats = [...names, 'Sol']
  console.log(cats)


  let a = ...[1,2,3] // causes an error
```

#### **Destructuring assignment**
- `Destructuring assign` can be used to extract elements from `[arrays & objects]` and assign it to variables 
```javascript
  [a, b] = [10, 20] // this expression is the same as var a = 10;
  console.log(a); // prints 10
  console.log(b); // prints 20 
```
- when `var, let or const` is not mentioned `var` is the default
```javascript
  [a] = 10; // var is assumed
  [a, b, ...rest] = [30, 40, 50, 60, 70];
  // a = 30;
  // b = 40
  // rest = 50, 60, 70
```
- Destructuring works on objects too
```javascript
  let oranges = { oranges: "1" } // oranges = 1
  let grapes = { oranges: "1", grapes: '2' } // grapes = 2 Does not matter the order
```
- Destructuring for inner object is not explicit but possible
```javascript
  let perros = {
    manada: {
      casa: {
        coco: 'coco',
        negrita: 'negrit'
      }
    }
  }

  let { coco, negrita } = perros.manada.casa
```
- If a variable is not found in the object, then it uses `undefined`
- You can use **spread** to easily merge objects or arrays
```javascript
  let a = { p: 1, q: 2 };
  let b = { r: 3, s: 4 };
  let c = { ...a, ...b }; // { p: 1, q: 2, r: 3, s: 4 }

  let a1 = [1,2];
  let b1 = [3,4];
  let c1 = [...a1, ...b1]; // [1, 2, 3, 4]
```
- `Spread` allows deep copies

