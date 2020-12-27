## Chapter 6: Acquiring behavior through inheritance
- **Well-designed** apps are constructed through the idea of _re-usable code_
- **Objects** that are:
  - Small 
  - trustworthy
  - Self-contained
  - Minimal context
  - clear interfaces
  - injected dependencies

### 6.1 Understanding classical inheritance
- **Inheritance** is a mechanism for message delegation
- It defines a forwarding path for _non-understood_ messages
- this behavior is created via **subclasses**
- The shared code is defined in the hierarchy

### 6.2 Recognizing where to use Inheritance
#### 6.2.1 Starting with a Concrete class
- `**opts` indicates that initialize will accept any number of keyword arguments and return them in a `Hash`
- Within inheritance **much of the behavior** already exists

#### 6.2.2 Embedding multiple types
- Remember not to fall in the tempting idea of adding more code to existing concrete class
- `if` statements to decide which message sends is an _anti-pattern_ because it says: "I know who you are and because of that I know what you do"
- This kind of `if` statements indicates the missing of a `subtype` in the hierarchy

#### 6.2.3 Finding the embedded types
- Variables such as `category`, `style` or `type` unveils the pattern
- Inheritance solves: That of highly related types that share common behavior but differ along some dimension

#### 6.2.4 Choosing inheritance
- Inheritance add the ability of an object to respond to a message even when its not in its interface. It delegates to the **parent** or **super type**
- Inheritance suggest a _biological_ tree
- Languages usually decide to go with **single-inheritance**
- `Super type` has many `subtypes`, however a `subtype` has only one `super type`
- In Ruby all objects come from `Object` class
- In Ruby `nil` is an instance of `NilClass`
- The fact that _unknown messages_ get delegated up the **superclass**, implies that **subclasses** are everything their superclass are and _more_
- **Subclasses** are thus specializations of their superclasses
- Usually inheritance is pictured as: **_is a_** relationship while composition is represented as: **_has a_** 

### 6.3 Misapplying inheritance
- Inheritance could lead to have behavior that it's not required in the specialization

### 6.4 Finding the abstraction
- Subclasses are specializations of their superclass
- For inheritance to work, two things must always be true:
  - Object must have a **generalization / specialization**
  - You must use the correct coding technique

#### 6.4.1 Creating an abstract superclass
- _abstract_ definition: Being disassociated from any specific instance
- Super class contains **shared code** between specializations
- Behold of `non-existing` **abstract** keyword
- **Abstract** classes exists to be subclassed
- **It never makes sense to create an abstract class with only one subclass**
- Creating a hierarchy has costs; **Creates dependencies**
- Sometimes its better to duplicate code between sister classes, that commit to a hierarchy. 
- With this you accept _that at the moment_ you don't have enough information to create an abstraction

#### 6.4.2 Promoting abstract behavior
- Remember, many problems of inheritance are caused by a **failure** of rigorously **separate** the concrete from the abstract.
- While designing and refactoring remember to ask yourself: "What will happen ~~if~~ _when_ I'm wrong?"
- **Untrustworthy** hierarchies force object that interact with them to know their quirks
- **Important:** while refactoring or creating hierarchies remember that _Promote abstractions > demote concretions_
- **Important:** Every decision you make includes two costs: _cost to implement_ & _cost to change_

#### 6.4.4 Using the template method pattern
- **Template method patter**: The technique of defining a basic structure in the super class and sending messages to acquire subclass-specific contributions
- Remember that _any class_ that uses the template method pattern **must supply** an implementation for every message it sends.
- Creating code that fails with reasonable error messages takes minor effort in the present but provides value forever.

### 6.5 Managing Coupling between Superclasses and Subclasses
- Tightly coupled classes stick together and may be impossible to change independently

#### 6.5.1 Understanding coupling
- Knowing things about other classes, as always, creates dependencies, and dependencies couple objects together.
- It makes sense that _subclasses_ know about it's parent, however, it's not ok forcing a subclass to know how to interact with its abstract superclass. This might cause problems

#### 6.5.2 Decoupling subclasses using hook messages
- Putting control of the timing in the superclass means the algorithm can change without forcing changes upon subclasses

### 6.6 Summary
- Inheritance soles the problem of related types that share a great deal of common behavior bu differs across some dimension
- Allows you to isolate shared code in the **abstract** class
- Allows subclasses/specializations contribute in the hierarchy
- Pushing-up/promoting code is the best way to create an abstract class
- Before going to a hierarchy, wait until you have 3 concrete classes
- **Abstract** superclasses use the template method pattern
- **Hook** methods allow subclasses to contribute without knowing the abstract algorithm
- Well-designed inheritance hierarchies, are easy to extend new subclasses. 