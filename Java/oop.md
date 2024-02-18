# What is OOP?

- Object is an instance of a class
- Class is a blueprint of an object
- An object has behavior (functions) & properties (fields)

## Abstraction

- It is the concept of hiding the internal details & describing things in simple terms
- Imagine as getting all the details of a person
- Abstraction can be applied to a intangible object (credit card)

## Encapsulation

- It is the concept of wrapping data & code together as a single unit
- It is a technique of hiding the implementation details from who is going to be using the object
- Java has access modifiers to implement encapsulation

## Polymorphism

- An object can behave differently in different situations
- Override & overload are examples of polymorphism
- overload -> you change the number of type of parameters
- override -> you change the implementation of a method

## Inheritance

- Described as `is-a`
- An object is based on another object
- Helps with code reuse
- Java uses `extends`
- Prefer `composition` over `inheritance`

## Aggregation

- Described as `has-a`
- Declares ownership between two objects

## Composition

- Described as `has-a` as aggregation
- Difference: the lifetime of the owned object is dependent on the lifetime of the owner
- If the owner is destroyed, the owned object is destroyed as well
