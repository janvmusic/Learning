## Chapter 8: Combining objects with Composition
- _The whole becomes the sum of it's parts_
- **Composition** is the act of combining distinct parts into a complex whole
- _Composition_ concept lays on **has a** relationship while inheritance uses **is a** relationship

### 8.2 Composing the Parts object
- Usually here lies _pluralization_ of objects, I.E. : _Part_ & _Parts_
- Each _element_ in the composition plays a _role_
- Through your design, you must take decisions based on **trade off**. There's no perfect solution

### 8.3 Creating the PartsFactory
- An _object_ that manufactures other objects is a **factory**
- Remember: _A pattern_ is just a way to communicate an idea of how to solve a problem
- A _factory_ helps to concentrate the logic/knowledge about how to create a **valid** object

### 8.4 The composed object
#### Aggregation: A special kind of composition
- **Delegation:** An object receives a message and forwards it to another
- _Delegation_ creates **dependencies** because must recognize the message **and** know where to send it
- **Composition** often involves delegation. A _composed_ object is made up of parts with which it expects to interact via well-defined interfaces.
- _Composed objects_ depends on the interface of the role
- The term _composition_ in a more specific sense means: _has-a_ relationship where the contained object has no life independent of its container
- **Aggregation** is exactly like composition, but the contained object has an independent life out of container.

### 8.5 Deciding between inheritance and composition
- **Classical inheritance* is a _code arrangement technique_
- **Remember**: For the cost of arranging objects in a hierarchy, you get _message delegation_ for free
- **Composition** allows objects to have structural independence, but at the cost of explicit message delegation
- **Rule**: If you cannot defend inheritance as a better solution, then use composition

#### 8.5.1 Accepting the consequences of inheritance
##### Benefits of inheritance
- Transparent, Reasonable, usable and exemplary
- Usually excels in last **3**
- Let's get deeper in this:
  - **Reasonable**: Big changes in behavior can be achieved via small changes in code
  - **Usable**: You can easily create new subclasses to accommodate new variants
  - **Exemplary**: By nature, these hierarchies provide guidance for writing the code to extend them

##### Costs of inheritance
- 2 types of problems: 
  1. you choose inheritance to solve _the wrong kind of problem_
  2. Use of your code for ways that are not correct or expected
- Applying incorrectly inheritance gives you the other side of the coin
  - **Reasonable**: Small changes break your code
  - **Usable**: Impossible to add new code when a new subclass is added
  - **Exemplary**: Chaos!
- Always try to answer _What will happen when I'm wrong_ before creating an inheritance hierarchy
- Avoid writing frameworks that require users of your code to subclass your objects in order to gain behavior

#### 8.5.2 Accepting the consequences of composition
##### Benefits of composition
- You will have several small objects, with their own responsibilities
- These objects are _transparent_; You know that they do and it's easy to foreseen changes
- _Pluggable_
- Easy to add new parts which is _reasonable_
- They are _usable_ in different contexts

##### Cost of composition
- While every individual part may be _transparent_ the whole object may not
- Individual Objects must know whom should answer a message
- There's no way to arrange code to share identical parts

#### 8.5.3 Choosing relationships
- Inheritance is specialization
- Inheritance is good when you need to add small code to old code
- Using composition when the behavior is more than the sum of its parts
- **Roles** usually are not the main responsibility of an object
- The more parts, an object has, the more it should be composition

### 8.6 Summary
- **Composition**: Combine object to create something greater
- They tend to consists in _simple_ & _discrete_ entities that can be re-arranges to create new combinations
- Easy to understand, reuse & test
- _Composition_, _Inheritance_ & _share code via modules_ have trade-offs
