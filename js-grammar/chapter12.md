### Chapter 12 - Arrays
- Most of the methods in `Arrays` are iterators.
- `Array` methods are **attached** to _Array.prototype_ property
- You can used them like:
```javascript
  [1,2,3].forEach();
```

#### 12.0.1 Array.prototype.sort()
- Previous `ES-10` V8 used an unstable version of quick sort algorithm
- A stable algorithm is when 2 objects with equal keys appear in the same order in the sorted output as in the unsorted input.

#### 12.0.2 Array.forEach
- This method will execute a function for every item in the array
- Before ES6.
```javascript
  let fruit = ['pear', 'banana', 'orange', 'apple', 'pineapple'];
  let print = function (item, index, object) {
    console.log(item);
  }

  fruit.forEach(print);
```
- `forEach` received 3 parameters **item, index & object**
- In ES6 you can use this method, using arrow functions:
```javascript
  fruit.forEach((item, index, object) => {
    console.log(item, index, object);
  });
```
- ES6 Slim form
```javascript
  fruit.forEach(item => console.log(item));
```
- As long as you have only one statement, you can remove brackets.

#### 12.0.3 Array.every
- This method evaluates for something that all items in the array has it
- Uses `short circuit` logic, so breaks when we get first _false_
- `Array.every` will not modify the original array. Uses a **copy** not a reference

#### 12.0.4 Array.some
- This method evaluates for _true_ if one element accomplishes the condition
- Uses **short circuit** logic.
- Note: this is not the opposite of `Array.every`

#### 12.0.5 Array.filter
- Return a new set of elements after applying a condition
```javascript
  let numbers = [0,10,2,3,4,5,6,7];
  let condition = value => value < 10;
  
  let filteredElements = numbers.filter(condition);
  console.log(filtered); // [0,2,3,4,5,6,7]
  console.log(numbers); // array unchanged
```

#### 12.0.6 Array.reduce
- Returns an accumulator
- The `accumulator` value must be returned
- There are different types of accumulators.
- As any other method that uses `iterables` **reducer** has access to current value (currentValue)
- `Array.reduce` vs `Array.filter`? `reduce` is the father of `filter` & `map`
- Anything done by `filter` or `map` can be done with `reduce`
- Use `reduce` when the return type is the same as the `input items`
- Do use it:
  - Sum or multiply numbers
  - Update state in react
- Do NOT use it
  - Building a new list or objects from scratch
  - For anything else, use A LOOP!
  - To mutate original input arguments
  - To perform side efects, like call APIs and routing transitions
  - To call non-pure functions, like **Date.now()** or **Math.random()**

#### 12.0.10 Array.flat
- Flattering multi-dimensional array
```javascript
  let multi = [1,2,3,[4,5,6,[7,8,9,[10,11,12]]]];
  multi.flat(); // [1, 2, 3, 4, 5, 6, Array(4)]
  multi.flat().flat(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, Array(3)]
  multi.flat().flat().flat(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  multi.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

#### 12.0.11 Array.flatMap
```javascript
  let array = [1,2,3,4,5];
  array.map(x => [x, x * 2]);

  /* Result of this
    [1, 2]
    [2, 4]
    [3, 6]
    [4, 8]
    [5, 10]
  */

  array.flatMap(v => [v, v * 2]);
  // [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
```

#### 12.0.12 String.prototype.matchAll()
- Match multiple patterns in a string it's a common problem
- Capturing groups in regrex is sumply extracting a pattern from parenthesis
- You can capture groups using _/regex/.exec(string)_ and with _string.match_
- `(pattern)` -> This means **capture group**
- `(?<name>pattern)` -> means capture group property on resulting object
- To create a **group name** prepend `?<name>` between brackets and voila!!
```javascript
  const input = 'black*raven lime*parrot white*seagull'
  const regex = /(?<color>.*?)\*(?<bird>[a-z0-9]+)/g;

  while (match = regex.exec(input)) {
    let value = match[0];
    let index = match.index;
    let input = match.input;

    console.log(`${value} at ${index} with '${input}'`);
    console.log(match.groups.color);
    console.log(match.groups.bird);
  }
```
- If you remove `/g` from the regex, thsi will cause a infinite loop
- Good reasons to use `.matchAll()`
  1. Elegant when using capture groups
  2. Returns iterator instead of array
  3. Iterator can be converted to array using spread operator
  4. Avoids using `/g` expressions
  5. RegEx object changes internal `.lastIndex` property.
```javascript
  let iterator = "hello".matchAll(/[el]/);
  for (const match of iterator) {
    console.log(match); // does not require /g
  }
```

```javascript
  const string = 'black*raven lime*parrot white*seagull';
  const regex = /(?<color>.*?)\*(?<bird>[a-z0-9]+)/;
  
  for(const match of string.matchAll(regex)) {
    let value = match[0];
    let index = match.index;
    let input = match.input;

    console.log(`${value} at ${index} with '${input}'`);
    console.log(match.groups.color);
    console.log(match.groups.bird);
  }
```
- Do use `string.matchAll` intead of `regex.exec` and use `string.match` with `/g` flag.

#### 12.0.14 Comparing 2 Objects
- `==` and `===` compares by reference, so it's no good for _objects_ because we need to compare them by value
```javascript
  [] === []; // return false by value
  let x = [];
  x === x; // return true by reference
```
- So, if you want to compare objects. Write, your own function
```javascript
// Shallow copy object comparison algorithm
export default function objectEquals(a, b) {
  let A = Object.getOwnPropertyNames(a);
  let B = Object.getOwnPropertyNames(b);
  
  if (A.length != B.length) {
    return false;
  }

  for (let i = 0; i < A.length; i++) {
    let propName = A[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}
```
- Previous solution does not compare `objects` or `arrays`
- Also properties attached are not checked
- To compare an array:
```javascript
  function is_array(value) {
    return typeof value.reduce == 'function' &&
           typeof value.filter == 'function' &&
 	   typeof value.map    == 'function' &&
           typeof valye.length == 'number';
  }
```
- We will also need arrcmp!
```javascript
  let a = [1,2];
  let b = [1,2];
  let c = [5,5];

  function arrcmp(a,b) {
    if (!(is_array(a) && is_array(b))) {
      return false;
    }

    if (a.length != b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }
```
- Javascript **DOES NOT** have a built in function to compare arrays
- Javascript **arrays** does not always guarantee integrity between its values and indexes they are stored at.
```javascript
// Shallow copy object comparison algorithm
export default function objectEquals(a, b) {
  let A = Object.getOwnPropertyNames(a);
  let B = Object.getOwnPropertyNames(b);
  
  if (A.length != B.length) {
    return false;
  }

  for (let i = 0; i < A.length; i++) {
    let propName = A[i];
    let p1 = a[propName];
    let p2 = b[propName];

    // Property points to an array
    if (is_array(p1) && is_array(p2)) {
      if (!arrcmp(p1,p2)) {
        return false;
      }
    } else if (p1.constructor === Object &&
               p2.constructor === Object) {
        if (!objcmp(p1,p2)) {
          return false;
        }
    } else if (p1 !== p2) {
      return false;
    } 
  }

  return true;
}
```

