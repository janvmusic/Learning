### Chapter 7 - Variables
#### **Variable definitions: Case sensitive**
- Variables are case sensitive; variable `A` is not the same as variable `a`
- You can define a variable using `var`, `let` or `const`
- If you try to use a variable that wasn't defined you would get a _ReferenceError_
- _Global scope_ variables are propagated into all inner scopes
- _Global scope_ is also **window** when using `var` definition, let does not attach variables to window
- Hoisting: _placed on to of_ or _raised_
- Hoisting is limited to `var`
- Using `let` or `const` variables means that these elements only exist in the scope that they were declared
- `var` elements declared in _function level_ remains in the level in which they were defined
- Hoisting is a safety element for Javascript

#### **Functions declaration**
- Function names are also hoisted;
- You can call a `function` as long is defined at some point
```javascript
fun();

function fun() {
  console.log("This function is going to be hoisted")
}
```
- _Functions_ can be assigned to variables; these functions are not going to be _hoisted_
- Named functions:
```javascript
function fun() { 
  // something here 
}
```
- Anon functions:
```javascript
var fun = function() { 
  // something here 
}
```
- If we have 2 functions that share names, the last defined will take precedence
- Functions are hoisted first!!!!!!

#### **Declaring variables inside inner scope**
- When declaring a variable inside an inner scope, it's defined inside this scope, it goes inn but not out
- Parent scope has no visibility to variables inside inner blocks;
- Closure pattern: Protect/hide variables from global scope, but still be able to use variables; Something like encapsulation

#### **Variable types**
- _Variable types_ can change during runtime
- Reserved words _let_, _const_ or _var_ does not determine it's value type
- `const` & `let` only exists in the declared scope
- `var` is deprecated, uses _window_ & right now is used to support legacy

#### **Scope visibility**
- When a variable is declared in the _global scope_ there's no difference between declare a variable using `let`, `const` or `var` (Talking about scope). They all propagate to inner scopes
- `const` & `let` are not hoisted, `var` yes
- All variables remain limited to their scope
- A _function closure_ is a function trapped in another function
- `Functions` inside `Functions` are concealed/hidden from global scope

#### **Scope in classes**
- `Class` scope is simply a placeholder
```javascript
class Cat {
  let age  = 0; // Unexpected token exception
  this.age = 0; // Unexpected token exception
}

class Cat {
  constructor() {
    let age   = 1;
    this.name = "Misifu";
  }

  getGeneralInformation() {
    console.log(this.age);
    console.log(this.name);
  }
}
```

#### **ES6 Const**
- `const` keyword is different than `let` and `var`
- `const` **cannot** be reassigned
- `const` **requires** to be assigned or has initial value
```javascript
  const a = []
  a[0] = 'A'; // valid
  a = []; // TypeError: Assignment to constant value
```
- Same as arrays, const allows you to modify values in an object


