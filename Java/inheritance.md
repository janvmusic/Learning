# Inheritance

- Creates a hierarchy in Java classes
- Inheritance is transitive
- Every class extends from Java Object
- Code reuse is the most important benefit of inheritance.
- Subclasses inherit all the members (fields, methods, and nested classes) from its superclass.
- Private members are not inherited.
- default access, means that only the classes within the package can access the members.
- Constructors are not inherited to subclasses
- Java does not support multiple inheritance
- Upcasting means transforming a subclass to a superclass
- Downcasting means transforming a superclass to a subclass
- We can override methods in subclasses
- `super` keyword is used to access the superclass members
- `super()` calls the parent class constructor
- `instanceOf` is used to detect the current inheritance of an object
- `final` keyword avoid having a class to be extended
- Remember abstract classes

## Multiple inheritance

- Diamond problem is the reason why Java decided to not use multiple inheritance
- Diamond problem is when a class inherits from two classes that have the same method
- Java uses interfaces to solve this problem
- each interface can have its own implementation of the method

## Composition vs Inheritance

- In some cases, if the super class is not well designed, it could lead to expose the implementation details to the subclasses
- Another downside of inheritance its that If we want to change the return type of the parent class, we need to change the return type of the child class
- Composition benefit: flexibility of invocation of methods
- Changes relation from: `is a` to `has a`
