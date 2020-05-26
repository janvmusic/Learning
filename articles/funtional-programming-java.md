## What is functional programming?
- A formal system in mathematical logic for expressing computation based on function abstraction and aplication using variable binding and substitution
- With help of a declarative programmint style, `FP` tries to bind our code in pure mathematical functions to build evaluable expressions

### Core concepts of Functional Programming
#### Pure functions
- Remember, same input generates the same output
- No side-effects. I.E. no global state or changing variable arguments
- Previous properties guarantee that pure functions can be safely be used in any environment.

#### Referential transparency
- Due predictable results for non-changing input arguments, we could replace an expression with its current values and wont break anything
- Due this, we could even implement an optimization technique called `memoization` or `function caching
- `memoization` removes unnecessary re-calculations of already evaluated expressions

#### Immutability
- Keep your data structures predictable and side-effect free
- Data structures, should not be modifiable after being initialized. 
- To change a data structure, we create a copy with the change included

#### Recursion
- Self-calling function that acts like a loop
- It evaluates expression multiple times until the `break` condition is reached
- This way we avoid having a stack overflow error

#### First-class and higher-order
- `Functions` are first class citizens like any other value
- This means that they can be **assigned** to variables, used as arguments and returned by other functions.
- A `High order` function is defined by accepting and/or return functions
- This is a pilar for `Functional Programming`

#### Functional composition
- It's the combination of pure functions to create a more complex expression
- I picture it like a `puzzle of functions`
- Mathematical expression would be: `h(x) = g(f(x))`

### Functional programming with Java
- The addition of `lambdas`, `optionals` & `streams` made Java more functional
- But Java is close to be functional or it's only sugar syntax?
- Java instead of linking dynamic methods, like lambdas at compile time, it has a dynamic call site with the actual target method just before the first execution
- Like dynamic method dispatching (I guess)
- A **bootstrap** method is used once on first call to link it and return a method handle. Somehow like reflection but safer and directly to the JVM (WHAT?!)
- There are different strategies to create lambdas:
  - Dynamic proxies
  - Anon Inner classes
  - Method handles
- But the decision is made at runtime by JVM
- The bootstrap method is oonluy called once.

### Functional core concepts and Java
#### Pure functions
- Check, same input results in the same output
- No side effects!
```java
  double circumference(double radius) {
    return 2.0 * Math.PI * radius;
  }
```

#### Referencial transparency
- In theory we could achieve this
- We have pure functions and we could cache function calls
- But its hard due there's no language constructs or helpers to do so

#### Immutability
- Java does this already in several classes already:
  - Strings
  - Value type wrappers: Integer, Boolean, Long
  - `java.time` classes
  - `immutable` collections with Java 9

#### Recursion
- Java has it but does not support `tail recursion`
- What is tail recursion?
  - Recursion but having the previous value calculated
  - In the tail-recursive case, with each evaluation of the recursive call, the running_total is updated.
  - Reference to definition: [Tail Recursion](https://stackoverflow.com/questions/33923/what-is-tail-recursion)

#### First class and higher order
- Checked!
```java
  // first class
  Supplier<String> lambda = myObject::String;

  // Higher order
  Supplier<String> higherOrder (Supplier<String> fn) {
    String result = fn.get();
    return () -> result;
  }
```

#### Functional composition
```java
Function<Integer, Integer> square = (input) -> input * input;
Function<Integer, Integer> multiplyByTen = (input) -> input * 10;

// COMPOSE: argument will be run first
Function<Integer, Integer> multiplyByTenAndSquare = square.compose(multiplyByTen);

// ANDTHEN: argument will run last
Function<Integer, Integer> squareAndMultiplyByTen = square.andThen(multiplyByTen);
```

### Is Java a functional language?
- Not really. However it was never their intent
- It's purpose is  to be a class-based object orientation. But with support of functional constructs
- The functional part is more like a tool box

### Conclusion
- Use functional core values:
  - Inmutability is always a great idea
  - No illegal state: Design your state to always be legal; No nulls, exceptions or locking/synchronization
  - Generics: Rely on correct type instead of use of `Object` or `Instance of`
  - Avoid magic: Always repeatable, no unpredictable stuff

### Source
- [Functional Programming with Java](https://medium.com/better-programming/functional-programming-with-java-an-introduction-daa783355731)
