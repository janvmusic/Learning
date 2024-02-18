# Interface

- Cannot be instantiated
- Provides absolute abstraction
- By default all attribute members in an interface are public, final & static
- By default all methods in an interface are public & abstract
- there is inheritance in interfaces (From interface to interface)
- `implements` keyword is used to implement an interface

## Benefits

- Interfaces provide a contract that need to be fullfilled
- Since java classes implements multiple interfaces, then it's better to use interfaces than Superclasses
- default methods!

## Disadvantages

- Changing an interface is a big deal, which could lead to several changes in the codebase or break the code
- Parent classes does not know the details of implementation
