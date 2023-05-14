# What is recommended to learn before diving deep with Node.js?

## Lexical Structure

- Basically, learn about:
  - Reserved Words
  - Variable declaration / identifiers
  - Comments and Block comments
  - `Hashbang` comments
  - Future reserved words => `[implements, interface, package, private, protected, public]`
  - Future reserved words (old) => [abstract, boolean, byte, char, final, etc]`
  - Literals: `null`, `true/false`, numeric, string, exponential, etc
  - Functions
  - namespace import vs named import

### Source

[MDN Lexical Grammar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar)

## Expressions and operators

- Read about these topics
  - `this`, literals, `[]`, `{}`, `function`, `class`
  - `function*`, `async function`, `yield`, `yield*`, `await`
  - `string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `symbol`, `object`
  - etc

### Source

[Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

## Data Types and Structures

- Javascript is dynamic and uses `dynamic types`.
- Variables in javascript can be any type:

```javascript
const n = 1;
const s = "string";
const b = true;
```

- Javascript is `weakly typed` which means that it's allowed a **implicit type conversion**

```javascript
const foo = 42;
const result = foo + "1";

console.log(result); // "421"
```

### Null

The **Null** type is inhabited by exactly one value: null.

### Undefined

The **Undefined** type is inhabited by exactly one value: undefined.

### Source

[JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

## OOP

- Read about
  - Classes
  - Variables (Storing your data)
  - Methods / Functions
  - This operator

### Source

- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables#what_is_a_variable)
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [This operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

## Arrow Functions

- Remember `() => {}` is the same as `function() {}`
- They do not bind their own `this`, `arguments`, `super`, or `new.target`
- They cannot be used as constructors
- They cannot use `yield` as a keyword
- They are `anonymous functions`

### Source

[Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
