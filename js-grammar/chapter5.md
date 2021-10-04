### Chapter 5 - Primitive types
- Javascript has 7 primitive types: `null`, `undefined`, `number`, `bigint`, `strings`, `boolean` & `symbol` 
- `Numbers`, `booleans` & `strings` are basic units
- `Strings` can be a template string `I have {$number} of apples`
- `Boolean` are _true_ or _false_
- `null` is an object. Null has no constructor WTF?
- `Number` they are part of the numeric domain (positive, negative, floats, infinity)
- `Numbers` has an special value `NaN` (not a number)
- Using constructors return object

#### **5.0.6 Numbers**
```javascript
  typeof -1 // => number
  let number = new Number(7)
  typeof number // => object
```
- To get "number" from the previous example you will need to use `number.valueOf`
- `bigint` was added in EcmaScript 10, it's not available in other versions
- `bigint` allows you to specify numbers bigger than `Number.MAX_SAFE_INTEGER`
- _Equality_ works among both types
```javascript
  10n === BigInt(10) // compares value & value type
  10n == 10 // uses implicit comparison

```
- _Math operators_ only work with their own type
```javascript
 200n / 10n; // 20n
 200n / 10; // Uncaught type error
```
- _Leading_ works with negatives
```javascript
 -1000n // -100n
 +1000n // Uncaught type error
```

#### **5.0.7 Numbers**
- `typeof "string"` returns string 
- You can use String constructor
- however for `typeof` you need to use `string.valueOf` to determine object type

#### **5.0.8 String templates**
- To create a template string you need to use back-tick quotes
```javascript
  let apples = 10;
  console.log(`There are ${apples} apples in the basket`);
  // result There are 10 apples in the basket
```
- Back-tick cannot be used to define an object-literal property name
- Ternary operator uses `?` and `:` to discern between one option or the other

#### **5.0.9 Symbols**
- Symbol used to create a unique key
- Does not have a constructor
```javascript
  let mySymbol = new Symbol('sym') // Type error
  let mySymbol = Symbol('sym') // symbol created
```
- Whenever you call `Symbol('sym')` a unique symbol is created
```javascript
  Symbol('sym') === Symbol('sym') // returns false
```
- Symbols can be used to define private object properties
- Used to create private properties in objects
- Private (symbol-based) properties are hidden from `Object.entries`, `Object.keys`, `iterators` & `JSON.stringify`
- Private (Symbol-based) properties can be exposed by `Object.getOwnPropertySymbol`
- Do not use `Object.getOwnPropertySymbol` it's intended for debug purposes
- You could use symbols for constants due it's unique ID
- To override the value of a symbol use: `Symbol.for('sym')` or `Symbol.keyFor('sym')`

#### **5.0.9.1 Constructors and instances**
- `Constructor` who knows how to build the object
- `Instance` the actual object built by the _constructor_
- _Function_ is the constructor to create JavaScript Functions
- _Object_ has the constructor function that could be overridden by other objects

#### **5.0.10 Executing methods on primitive types**
- _Parenthesis_ let you know which statement should evaluate
- When you execute a method over a primitive type, Javascript converts it to _object_
```javascript
1.toString(); // will freeze execution
(1).toString(); // Wraps the primitive type then executes the function that will return "1"
new Number(1).toString();
"hello".toUpperCase();
```
- In Javascript you can do chaining methods
```javascript
"hello".toUpperCase().substr(1,4); // returns "ELLO"
```

