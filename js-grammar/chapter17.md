### Chapter 17 - Prototype
- When a function is defined 2 things happen:
  - The **function object** is created; Remember **functions** are objects in Javascript
  - Then another **prototype** object is created
```javascript
  function Human(name) { };
  console.log(typeof Human.prototype); // prints "Object"
```
- When this _human prototype_ is created **prototype** will point to the prototype object and _human function_ will point to function constructor
- Remember _Human_ function is a **constructor** but its _prototype_ points to a different location in memory
- Note: _prototype_ is not available on **instances**; It's only available in the constructor function
- Note: On an _instance_ you can access to prototype via:
  - `__proto_+`; In fact this is a getter!
  - Object.getPrototypeOf(instance); This is the preferred way

#### 17.0.2 Prototype on Object Literal
- A **JavaScript object literal** is a comma-separated list of name-value pairs wrapped in curly braces.
- Lets begin with an example:
```javascript
  let literal = {
    prop: 123,
    meth: function() {},
  }
```
- Internally is linked into prototype as an object type
- When **literal** was created it was linked to `literal._proto_` which points to `Object.prototype`

#### 17.0.3 Prototype Link
- When **new** keyword is used to create an object, the **constructor** function executes to build the instance
```
  let instance = new Object();
  instance.prop; // returns 123
  instance.meth; // returns function() {};
```
- In this case `_proto_` points to `Object.prototype`; which is a separate object
- We do not exactly control how the object was created, because points to a **built in** object
- `_proto_` is in the object. It's a threeway relationship

#### 17.0.5 Method look-up
- Think of an `Array` what happens when you call `.toString()?`
  1. first looks up in its `Array.prototype`
  2. Since it's not there, goes to it's parent: `Object.prototype`
  3. Finds it, uses it!

#### 17.0.6 Array methods
- Native methods for `Array` should exists in `Array.prototype`
- If you want to extend functionality of arrays then attach your method to `Array.prototype`

#### 17.1 Parenting
- How does Array know where to look for a method? `Prototype chain!`

#### 17.1.1 Exenting your own objects
- What if we want to have something like _Java Inheritance_?
  - You could directly mess with prototype... Bad idea
  - Maybe you could create a new prototype and replace original? ... hacky
  - In EC6 you should use `class` and `extends` that way you do not worry about prototype links

#### 17.1.2 constructor property
- `Object` constructor points to `function`
- `Function` constructor points to `function`... wait what?
- This is called **circular dependency**
- `Function` is the constructor of all object types

#### 17.2.1 Object Literal
- In some ways, under the hood Javascript wires up all the prototype linking
```javascript
  let cat = {};
  cat.name = "Felix"
  cat.hunger = 0;
  cat.energy = 1;
  cat.state = "iddle"

  cat.sleep = function(amount) {
    this.state = "sleeping";
    console.log(`${this.name} is ${this.state}`);

    this.energy += 1;
    this.hunger += 1;
  };

  cat.wakeup = function() {
    this.state = "iddle";  
    console.log(`${this.name} woke up`);
  };

  cat.eat = function(amount) {
    this.state = "eating";
    console.log(`${this.name} is ${this.state}
                 ${amount} unit(s) of food.`);

    if (this.hunger -= amount <= 0) {
      this.energy += amount;
    } else {
      this.wakeup();
    }
  };

  cat.wander = function() {
    this.state = "wandering";
    console.log(`${this.name} is ${this.state}`);

    if (--this.energy < 1) {
      this.sleep(5);
    }
  };
```
- To create a "class" in ES5 we would wrap previous `object literal` in a **function**
```javascript
function Cat(name, hunger, energy, state) {
  let cat = {};
  
  cat.name = name;
  cat.hunger = hunger;
  cat.energy = energy;
  cat.state = state;

  cat.sleep = function(amount) = { /* implement */ };
  cat.wakeup = function() = { /* implement */ };
  cat.eat = function(amount) = { /* implement */ };
  cat.wander = function() = { /* implement */ };

  return cat;
};
```
- With this way, we can create different objects, using these lines:
```javascript
  let felix = Cat("Felix", 10, 5, "iddle");
  felix.sleep(5);
  felix.eat(5);
  felix.wander(6);

  let luna = Cat("Luna", 8, 3, "iddle");
  luna.sleep(5);
  luna.wander();
  luna.eat(1);
```

#### 17.2.3 Prototype
- The problem with previous approach is that each instance `Luna` & `Felix` each one has a copy of methods like: `sleep`, `eat`, `wander` & `wakeup`
- These objects are not shared but each individual has it's own
- That means...double memory use!
- **Important** This is the problem `prototype` tries to solve!
```javascript
function Cat(name, hunger, energy, state) {
  let cat = {};
  
  cat.name = name;
  cat.hunger = hunger;
  cat.energy = energy;
  cat.state = state;

  cat.sleep = prototype.sleep;
  cat.wakeup = prototype.wakeup;
  cat.eat = prototype.eat;
  cat.wander = prototype.wander;

  return cat;
};
```
- Now `Luna` & `Felix` share methods via `prototype`

#### 17.2.4 Creating objects using Object.create
- You can as well use `Object.create` function like this:
```javascript
const cat = {
  name: "Felix",
  state: "iddle",
  hunger: 1,
}

const kitten = Object.create(cat);
kitten.name = "Luna";
kitten.state = "sleeping"

console.log(kitten); // returns {name: "Luna", state: "sleeping"}, where's hunger property??
```
- `Hunger` exists when we use:
```javascript
console.log(kitten.hunger); // returns 1... actual wtf?
```
- Ok when `kitten.hunger` is called, object does not contains `hunger` so it goes back to instance and wont find the method
- Then goes back to it's parent `cat` and finally finds it!
- Now! let's do it correctly!
```javascript
  const prototype = {
    sleep(amount) { /* implement */ };
    wakeup() { /* implement */ };
    eat(amount) { /* implement */ };
    wander() { /* implement */ };
  };

  function Cat(name, hunger, energy, state) {
    let cat = Object.create(prototype);

    cat.name = name;
    cat.hunger = hunger;
    cat.energy = energy;
    cat.state = state;

    return cat;
  };
```
- Using this way, we declare a **shared** prototype object and this way we do not have an extra space of memory

#### 17.2.6 Function constructor
- Let's recall that each object has is own `ghost prototye` reference
- When we do the following, we are ensuring that prototype object has correct references:
```javascript
  function Cat(name, hunger, energy, state) {
    let cat = Object.create(prototype);

    cat.prototype.sleep = function { /* implement */ };
    cat.prototype.wakeup = function { /* implement */ };
    cat.prototype.eat = function { /* implement */ };
    cat.prototype.wander = function { /* implement */ };

    cat.name = name;
    cat.hunger = hunger;
    cat.energy = energy;
    cat.state = state;

    return cat;
  };
```
- Therefore the main purpose of `prototype` is to server as a special lookup object, which will be shared across all instances of object instantiated.
- This action will preserve memory!

#### 17.2.7 Along came new operator
- So forget about all that crap... and lets use `new` operator...WHY!!!!!
- It automatically does previously mentioned (prototype linking)
```javascript
  function Cat(name, hunger, energy, state) {
    cat.name = name;
    cat.hunger = hunger;
    cat.energy = energy;
    cat.state = state;
  };

  Cat.prototype.sleep = function { /* implement */ };
  Cat.prototype.wakeup = function { /* implement */ };
  Cat.prototype.eat = function { /* implement */ };
  Cat.prototype.wander = function { /* implement */ };

  let luna = new Cat("Luna", 8, 3, "iddle");
  luna.sleep();

  let felix = new Cat("Felix", 5, 1, "sleeping");
  felix.wakeup();
```

#### 17.2.8 ES6 The class keyword
- All resumes here, with ES6 and `class` keyword
- It's a bad practice to have to touch `prototype` object in Javascript
```javascript
  // Good example
  class Cat {
    constructor(name, hunger, energy, state) {
      this.name = name;
      this.hunger = hunger;
      this.energy = energy;
      this.state = state;
    };

    sleep() { /* implement */ };
    wakeup() { /* implement */ };
    eat() { /* implement */ };
    wander() { /* implement */ };
  }

  let luna = new Cat("Luna", 8, 3, "iddle");
  luna.sleep();

  let felix = new Cat("Felix" 5, 1, "sleeping");
  felix.wakeup();
```
- This approach let Javascript to worry about prototype, not us
