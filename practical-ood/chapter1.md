## Chapter 1: In Praise of Design
### 1.1.1 The problem design solves
- Unfortunately, something *will* change. It always does
  - Customers didn't know what they wanted
  - Customers didn't say what they meant
  - You didn't understand their needs
  - Or what about if the app is a great success?
- **Change is unavoidable, it's ubiquitous, omnipresent and inevitable**
- It's the need for change that makes **design** matter

### 1.1.2 Why change is hard
- Object-oriented apps are made up of parts that interacts and produce the behavior of the whole. These parts are **objects**
- The interactions are embodied in the **messages** passed between them.
- Sender and receiver needs to know about each other. This creates **dependencies** between them
- These dependencies, creates _resistance to change_.
- OOD is about _managing dependencies_. Without it, objects know too much about one another. 
- When objects know **too much** about each other, they create expectations and these expectations **constrains them**.

### 1.1.2 A practical definition of design
- Every app is a collection of code; How we arrange it is the **design**
- **The design** is the art of arranging code
- The hard part of **design** is that every change you make is composed by two components
  - The component that needs to be delivered today
  - Foundation for future change
- You job is to synthesis the _overall understanding of your application's requirements_ and _knowledge of the cost_ in order to be **cost effective** in the present and will continue to be so in the future
- Design that **anticipates future** always end bad...
- **Practical design** does not anticipate specific future, it accepts that something will change in the future. Embraces it.
- It leaves room to grow.
- _The purpose of design is to allow you to do design later, and it's primary goal is to reduce the cost of 

## 1.2 The tools of design
### 1.2.1 Design Principles
- SOLID
  - Single Responsibility
  - Open-Close Principle
  - Liskov Substitution
  - Interface Segregation
  - Dependency Inversion 
- Other options
  - DRY
  - Law of Demeter: _Only talk to friends, no to strangers_

### 1.2.2 Design Patterns
- The notion of design patterns is incredibly powerful. To name common problems and to solve the problems in common ways brings the fuzzy into focus.
- Be careful because we can apply patterns to wrong problems.
- _A tool cannot be faulted for its use; The user must master the tool_

## 1.3 The act of Design
- Knowing how software should look when it's done does not cause it to build itself; Applications come to existence because some programmer applied the tools.

### 1.3.1 How design fails
- The first way design fails is due to **lack of it**
- However, **successful but undesigned** applications carry the seeds of they own destruction.
- A little bit of knowledge is dangerous. It could lead to the trap of **overdesign**
- OO software fails when the act of design is separated from the act of programming.

### 1.3.2 When to design
- Agile believes that your customers can't define the software they want before seeing it
- So it's best to show them sooner rather than later.
- Collaboration produces software that differs from 
- Same as agile, it's a collaborative process

### 1.3.3 Judging Design
- Metrics needs to be unbiased
- Metrics should evaluate _cost and features_
- Sometimes the value of having a feature right now is so great that it outweighs any future increase in cost
- Technical debt: code that we will need to pay in the future, probably with interests
- The break-even point for design depends on the programmer. 

## 1.4 A Brief introduction to Object-Oriented Programming
- Objects pass messages between them

### 1.4.1 Procedural Languages
- They have data types
- Each data type describes a very specific kind of thing
- Each variable type has it's own capabilities
- Every possible data type and operation already exists; these things are part of the syntax of the language
- Data & Operations are completely different things

### 1.4.2 Object Oriented Languages
- Object and behavior are part of the same unit
- Each object **encapsulates** or **hides** data from the world.
- Every object decides how much, or how little of it's data to expose
- Class: blueprint for the construction of similar objects.
- A **class** defines _methods_ (behavior) and _attributes_ (variables). Methods get invoked in response to messages!
- Once a **class** exists, it could be **instantiated** or create new instances of a object
- Every **instance** shares method names and behavior as other instances
- OOP languages constructs themselves based on _Class_ class
