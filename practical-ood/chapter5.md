## Chapter 5: Reducing costs with Duck Typing
- The **purpose** of OOD is reducing the cost of change
- **Duck Typing** is a technique to create public interfaces not tied to a class. These interfaces add a enormous flexibility 
- Duck typed objects are like `chameleons` that are defined more by behavior

### 5.1 Understanding duck typing
- `type` => category of the content of a variable
- The `type` or `category` gives a context to the language to assume what it can do
- If an object **knows** another's **type**, it **knows** which **messages** that object can **respond**
- Users of an **object** need not, and should not, be concerned about its class.
- It's not a matter of what an _object is_ but what _it does_

#### 5.1.1 Overlooking the duck
- Sequence diagrams should always be simpler than the code they represent; when they are not, something is wrong with the design

#### 5.1.3 Finding the duck
- The key to removing the dependencies is to recognize that because Trip's prepare method serves a single purpose, its arguments arrive wishing to collaborate to accomplish a single goal
- Every argument is there for the **same reason**
- **Think**: what is our goal? Do I know to know _how_ or _what_ I want? THis way we can trust that all "Preparers" will implement what I `want`

#### 5.1.4 Consequences of Duck Typing
- Depending on abstractions allow us to be prepared for a change. It's easier to extend.
- Depending on concrete classes, are far readable but any change is painful
- Abstract code is obscure but extendable | Concrete code is understandable but difficult to extend. This tension is fundamental for OOD
- Remember to define your objects as _behavior_

### Polymorphism
- OOP: Many different objects respond to the same message. 
- The sender does not worry about who is the receiver
- The supplier responds their own version of the message

### 5.2 Writing code that relies on ducks
#### 5.2.1 Recognizing hidden ducks
- You can identify them via:
  - Case statements
  - kind_of? and is_a?
  - responds_to?
- The message or question, defines the underling duck

#### 5.2.2 Placing trust in your ducks
- Within previous examples we respond to this:
  - "I know who you are, because of that, I know what you do
- When you create duck types, you must both document and test the public interface

#### 5.2.5 Choosing your ducks wisely
- The decision to create a new duck type relies on judgement
- Remember The purpose of design is to lower cost
- If creating a _duck type_ reduces usage of unstable dependencies, good, refactor!
- Changing base classes is known as `Monkey Patching` DON'T

#### 5.3 Conquering the fear of Duck Typing