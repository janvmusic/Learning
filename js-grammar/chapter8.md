### Chapter 8 - Arithmetic
- Same as Java
- `%` returns the number of times one numbers into the other. It's often used to determine the remainder
- For numbers these operators `=, +=, -=, *=, /= %=` allows you to assign values
- For strings these operators help you to perform these:
  - `=` string assignment
  - `+=` concatenation
  - `+` addition

#### **8.0.4 Comparison**
- `==` means equality
- `===` means equality of value and type
```javascript
  1 == '1' // returns true
  1 === '1' // returns false
```
- `!=` inequality
- `!==` inequality of value and type
```javascript
  1 != '1'// returns false
  1 !== '1' // returns true
```
- `>, <, <=, >=` works as Java

#### **8.0.5 Logical**
- `&&, ||, !` same as Java
- _Bitwise_ operators... 

#### **8.0.7 typeof**
- This operator `typeof` is used to check the type of a value. The return value of this is a string
```javascript
  typeof 125 // returns number
  typeof 'hola' // returns string
```
- `NaN` evaluates to number. `NaN` lives in _Number.NaN_

#### **8.0.8 Ternary**
- Same as Java
```javascript
  1===1 ? doSomething() : doOtherThing();
```

#### **8.0.9 Delete**
- To remove a property from an object use the operator: `delete`
```javascript
  let bird = {
    name: 'Raven',
    speed: '30mpg'
  };

  console.log(bird);
  delete bird.speed;
  console.log(bird);
```
- You cannot remove _stand alone_ variables

#### **8.0.9 in**
- Looks for a property name inside an object
```javascript
'c' in { 'a': 1, 'b': 2, 'c': 3} // returns true
'c' in { 'a': 1, 'b': 2, 'c': 3} // returns true
```
- When used in _arrays_ the `in` operator checks if an index exists
```javascript
'c' in ['a','b','c','d'] // returns false
0 in ['a','b','c','d'] // returns true
```
- You can check for properties build-in data types
```javascript
  'length' in [] // returns true
  'length' in [1, 2, 3] // returns true
  'length' in {} // returns false
  'length' in { length: '2' } // returns true
```
- Checks for the presence of `constructor` or `prototype`
```javascript
  'Constructor' in Object // returns true
  'prototype' in Object // returns true
```

