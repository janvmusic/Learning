## Chapter 7: Sharing role behavior with Modules
- To reap benefits from using inheritance you must understand not only how to write code but also when it **makes sense to do so.**
- Using _classic inheritance_ is always optional. Remember that every problem can be solved with a different approach.
- Creating **the most** cost-effective application required making **informed tradeoff** between the relative costs and likely benefits of alternatives 

### 7.1 Understanding Roles
- Some problems require sharing behavior among otherwise unrelated objects
- Behavior unrelated to class / orthogonal to class.
- **It's a _role_ an object plays**
- Using a role creates dependencies among the objects involved.

#### **7.1.1 Finding a role**
- Usually comes in _pairs_ (Prepared / Preparable)
- Usually _objects_ which plays _roles_ implements a method (Such in Java). Each one with its own version
- **Question**: Ruby Modules => Java modules ??
- **Module**: Named group of methods that are independent of a class and can be mixed in to any object
- When an _object_ includes a module, the methods defined therein becomes available via automatic delegation 
- Once you start **putting code into modules** and adding modules to objects, you **expand the set of message** which an object **can respond**

#### **7.1.3 Removing unnecessary dependencies**
- Letting objects speak for themselves
- Objects should contain their own behavior

#### **7.1.4 Writing the concrete code**
- During design you are going to be forced to resolve 2 questions
  - What the code should do?
  - Where the code should live?

#### **7.1.5 Extracting the abstraction**
- The code in `Schedulable` is the _abstraction_ and it uses the template method pattern to invite objects to provide specializations
- **Remember** _is-a_ versus _behaves-like-a_
- These code techniques (Inheritance & modules) share something in common: **Automatic message delegation**

#### **7.1.6 Looking up methods**
- Objects look first in that object _class_ for a matching method implementation
- **Method lookup**: Object class => Super classes => Object class => No method found!!!
- What happens when there's a module? How does method look-up changes?
  - **Method lookup**: Object class => Super classes => **Modules** => Object class => No method found!!!
- **include module** adds methods to the object hierarchy
- **extends module** adds methods to the object
- In Ruby you can do "monkey" patching, which mean **add methods** to the singleton instance 

#### **7.1.7 Inheriting role behavior**
- **Remember**: You can write code that is impossible to understand, debug or extend... it's not PHP hahaha
- **Your task** is not to avoid these techniques but to **learn to use them** for the right reasons, in the right places, **in the correct way**.

### 7.2 Writing inheritable code
- The **usefulness and maintainability** of inheritance hierarchies and modules is in **direct proportion to the quality of the code**

#### **7.2.1 Recognize the anti-patterns**
- _category_ or _type_ variables => inheritance hierarchy to avoid 
- Checking the _type_ to know which message to send => duck type here (role)

#### **7.2.2 Insist on the abstraction**
- **Important:** All of the code in an abstract super class should apply to every class that inherits it. **PERIOD**
- **Important:** The code in a module must apply to all who use it
- A example of this issue is: "Not implemented" method message
- When **subclasses** override a method to declare that they _do not do that thing_ they almost state that _they are not that thing_
- If you cannot identify the abstraction, then it means that **inheritance** is not the solution.

#### **7.2.3 Honor the contract**
- Subclasses **agree** to a _contract_
- **Substitutability** is possible only when objects behave as expected super class/interface.
- Remember **Liskov**: subtypes must be substitutable for their super types
- **Important** subtypes can play the _role_ of the super type

#### **7.2.4 Use the template method pattern**
- This pattern let's you separate the abstract from the concrete.
- _The abstract defines the algorithm & inheritors contribute with the specialization_
- Template methods represents the parts that _vary_ in the algorithm, and creating them forces you to make explicit decisions about what varies and what does not.

#### **7.2.5 Preemptively decouple classes**
- **Avoid** writing code that required its inheritors **to send super**;
- Instead **use hook messages** to allow subclasses to participate while absolving them of the responsibility for knowing the abstract algorithm.

#### **7.2.6 Create shallow hierarchies**
- Every hierarchy can be thought of a pyramid that has both depth and breadth
- **Depth** => number of classes between the object and the superclass
- **Breadth** => The number of its direct subclasses
- Remember: **Shallow & narrow** hierarchies are easy to understand
- Avoid: **Deep and wide** hierarchies

### 7.3 Summary
- When objects share behavior then they play a common role 
- In Ruby a module can be added to any object, be it an instance of a class, a class itself or another module
- When a Module is added to an object, then gets added to the **method lookup** path
- Use template methods
- Avoid using `super` in specializations
- Honor the contract!!!!

