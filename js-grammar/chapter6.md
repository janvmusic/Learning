### Chapter 6 - Type coercion madness
- When `+` operator finds objects of incompatible type, it will attempt to _coerce_ those objects to their values in string format
- If `+` finds a string, this type will take precedence
- Besides operators, _Type coercion_ could happen in constructors
```javascript
  let a = Boolean(true); // true
  let a = Boolean([]]); // true
  let a = Boolean({}); // true
```
- Javascript will try to coerce to an ideal value specific to that type
- **Coercion** is the process of converting a value from one type into another
- `==` tests objects by reference, not by value
- Javascript will often coerce different types to its **string** or **number** value
- If during operation, Javascript discover that the types are different then will use _type coercion_ to change one of the values before performing the operation
- Javascript uses three types of `+` operators: _unary_, _arithmetic_ & _string_
- Operators evaluate from _left_ to _right_
- One exception of this rule is `assignation` which evaluates from _right_ to _left_
- When adding _numbers_ and _strings_ `arithmetic` operators takes precedence
- However, Javascript prefers to coerce to string before number (in addition operation)
- For _multiplication_ the coercion occurs from string to number. Remember `3 * "" => 0`
- _null_ => value is empty
- _undefined_ => value is not assigned
- Avoid using **undefined** as initial value, prefer **null**

#### **6.0.1 Examples of type coercion**
- Javascript will try to come up with best value available if you supply meaningless combinations of types to some of its operators
- Usually this wont happen in prod code, however is good to know this

