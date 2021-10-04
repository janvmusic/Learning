### Chapter 11 - Loops
- Iterating: the act of repeat the same action **n** number of times
- Array is iterable while Object, no.
- Enumerable types do not guarantee the order in which properties will appear when iterated
- Types of loops: `for`, `for...of`, `for...in`, `while` & `Array.forEach`
- Some **Array** methods are considered to be iterators: `.values`, `.keys`, `.map`, `.every`, `.some`, `.filter` & `.reduce`,


#### **Reduce**
```javascript
  let miles = [5, 12, 75, 2, 5];

  let A = 0;
  for (let i = 0; i < 5; i++) {
    A += miles[i];
  }

  console.log(A); // returns 99
```
- You can use `Reduce` function to use high order functions
```javascript
  const R = (accumulator, value) => accumulator + value;
  const result = miles.reduce(R);
  console.log(result); // returns 99
```

#### **11.1 Loops**
- Contains 3 basic elements;
- **initialize**: `i = 0`;
- **test condition**: `i < 5`;
- **increment/decrement**: `i++`;
- Remember that most of the _List_ elements are based on a **0 index**
- **Multiple statements**: You can call several functions during an iteration using `comma`
```javascript
  let counter = 0;
  function inc() {
    counter++;
  }

  for (let i = 0; i < 10; i++, inc());
  console.log(counter); // returns 10;
```
- `let` elements need to be enclosed by brackets when used in a `for` loop
```javascript
  for (let i = 0; i < 10; i++) let x = i; // throws an error
  
  for (let i = 0; i < 10; i++) {
    let x = i; // it works!
  } 
```
- Javascript allows nested looks
- As in Java, you can use `continue` keyword to skip one iteration
- As in Java, you can use `break` keyword to get out of loop execution
- None of the 3 basic elements are required, you can use `;;` and move the context to the loop body
- You can use `labels` in Javascript. This is interesting
```javascript
  let c = 0
  mark: for (let i = 0; i < 5; i++) {
    inner: for(let j = 0; j < 5; j++) {
      c++;
      if (i === 2) {
        break mark;
      }
    }
  }
  console.log(c); // returns 11
```
```javascript
  let c = 0
  mark: for (let i = 0; i < 5; i++) {
    inner: for(let j = 0; j < 5; j++) {
      c++;
      if (i === 2) {
        break inner;
      }
    }
  }
  console.log(c); // returns 21
```
- All the instructions called after `break`/`continue` keywords are going to be ignored
```javascript
block: {
  console.log("before");
  break;
  console.log("after");
}
```
#### **11.2 for...of Loop**
#### **11.2.1 for...of Loop + Generators**
- **Generators** are function declared with a `*`. They can `yield` and can execute several likes by parts, not following all the lines
```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

for (let value of generator()) {
  console.log(value);
}

// prints: 1, then prints 2, then prints 3
let generator = generator();

console.log(generator.next().value); // prints one
console.log(generator.next().value); // prints two
```
- **Generators** are one-time use functions. you should not attempt to reuse a generator function more than once. They are not a regular functions!!

#### **11.2.1 for...of Loop**
- `Strings` are **iterables**, you can walk each character using a `for...of` statement
```javascript
  let heroName = 'Jotaro Joestar';

  for (let character of heroName) {
    console.log(character);
  }
```

#### **11.2.3 for ... of and Arrays**
- `for...of` it the equivalent to `for each` in Java
```javascript
  let array = [0,1,2];
  for (let value of array) {
    console.log(value);
  }
```

#### **11.2.3 for ... of and Objects**
- `Objects` in Javascript are not iterables
- `Objects` has enumerable properties
- As remedy for this, we can use `Objects.keys`, `Objects.values` or `Objects.entries`
```javascript
  let enumerable = { property: 1, method : () => {} };

  for (let key of Object.keys(enumerable)) {
    console.log(key);
    // Will print: method, property.
    // Because those are the keys in the enumerable object
  }

  for (let value of Object.values(enumerable)) {
    console.log(value);
    // Will print: 1, () => {}
    // Because those are the values in the enumerable object
  }

  for (let entry of Object.entries(enumerable)) {
    console.log(entry);
    // Will print: [property, 1] & [method, f]
    // Because those are the tuples in the enumerable object
  }
```
- This can be also achieved using `for...in` loop, this will help to avoid use any of the Object conversion method

#### **11.3 for ... in**
- `for ...of` loops only uses iterables. Remember Objects are _enumerable_
- `for ...in` loops work with _enumerable_ object properties
```javascript
  let object = {
    a: 1,
    b: 2,
    c: 3,
    method: () => {}
  }

  for (let value in object) {
    console.log(value, object[value]);
    // This will print 
    // 1
    // 2
    // 3
    // () => {}
  }
```
- Not all objects properties are enumerable even if they exist on the object.
- `for...in` will skip all non `enumerable` properties
- `constructor` and `prototype` are not enumerable

#### **11.4 While loops**
- **While** loops will iterate until the condition becomes false
- You can use secondary conditions to break **while** earlier if needed
```javascript
  let c = 0;
  while (c++ < 5) {
    console.log(c);
  }
```

#### **11.4.1 While and continue**
- **Continue** keyword can be used to skip steps.
- However if you need earlier termination, use break

