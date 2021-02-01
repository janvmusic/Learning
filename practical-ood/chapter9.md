## Chapter 9: Design cost-effective tests
- From a _practical_ perspective **changeability** is the most valuable characteristic from code
- Remember that you need to be good at refactoring
- _Refactoring_ does not alter existing behavior but **improves the code**
- **Good design** preserves maximum **flexibility** at minimum cost by putting off decisions at every opportunity
- Efficient tests prove that altered code continues to behave correctly without raising overall costs

### 9.1 Intentional Testing
- Tests main purpose is to reduce cost of change
- When they are not worthy? When consumes more time than fix bugs, write documentation & design application
- What, when and how to test?

#### 9.1.1 Knowing your intentions
##### Finding bugs
- It's easier to _catch and fix_ a bug when it's created or during early stages
- When we leave the bug, other people start to work on that premise
- Fixing bugs, in late stages, are costly

##### Supplying documentation
- Test provide the only reliable documentation of design
- Write your tests as if you expect your future self have amnesia

##### Deferring design decisions
- Tests let you have documentation of decisions you had to take in an specific moment in time
- You should tests interfaces; This way you can take decisions without _penalty_

##### Supporting abstractions
- Good design naturally progresses toward small independent objects that rely on abstractions.
- The behavior of a well-designed app gradually becomes the result of interaction between abstractions
- Abstractions make difficult to understand the **whole**

##### Exposing design flaws
- If a test requires a **painful setup**, the code **expects too much** context
- If testing one object **drags a bunch of other objects** into the mix, the code **has too many** dependencies
- If the test is **hard to write**, other objects will find the code **difficult to reuse**.
- It is, also, possible to write bad tests for a well designed code.

#### 9.1.2 Knowing what to test
- Test everything in once and in the proper place
  - Why? Simplify changes in only one tests
  - Why? Lowers cost to update code
- Tests **should** change only when necessary
- Tests should reflect on OOD. For example _validate messages_ passed through objects
- Others can see what's inside the test. The test **must not know** what's outside it's scope
- **The design principles you enforce on your code, apply to tests as well**
- We accept that a test depends on a class.
- The most costly tests are the ones which are tangled to unstable internal details
- Test should concentrate on the input / output boundaries
- Test that assert the result message are called: **test of state**
- **Important:** Test must assert only their knowledge domain.
- Public interface _queries_ do not need to have test
- There are messages which have a side effect. These messages are _Commands_
- Proving that _commands_ were sent, it's called **behavior test**
- When tests **depend** only on the public interface, any change on the private behavior wont not affect the test.

#### 9.1.3 Knowing when to test
- You should write test first, whenever it makes sense to do so.
- Writing test first forces us to think on code reusability
- Developer's overall goal is to create well-designed application that have acceptable test coverage.
- **Legacy code** = Code that can't be tested.

#### 9.1.4 Knowing how to test
- **BDD** -> outside-in approach
- **TDD** -> inside-out approach
- Your tests may remain agnostic from the _outside world_
- Remember to test on the _edge_ of the object. Don't let your test to have information it does not require.

### 9.2 Testing income messages

- Testing income messages is required because it's the _face to the world_

#### 9.2.1 Deleting unused interfaces

- **Fact:** Incoming messages ought to have dependents
- If you find that there's an incoming message without dependent, do not test it. If possible remove it
- Delete unused code saves money right now, if you do not do so... you must test it
- Unused code cost more to keep than to recover

#### 9.2.2 Proving the public interface

- Incoming messages are tested by making assertions about the value or state, that their invocation returns.

#### 9.2.3 Isolating the object under test

- Try to test the **role** instead of the class
- **Important** Thinking of the injected object as an instance of its rile gives you more options to create a test.

#### 9.2.4 Injecting dependencies using classes

- When the code in your test uses the same collaborating objects as the code in your app, your test will break when they should
- However this creates a dependency to the concrete class.

#### 9.2.5 Injecting dependencies as roles

- The whole point of **Dependency Injection** is that it allows you to substitute different concrete classes without changing existing code
- Within **Dependency Injection** You don't care about the object class but **the role it plays**
- Stub objects returns **_canned_** answers
- **Important** Writing good tests requires understanding the root cause of the problem.

### 9.3 Testing private methods
- Do not fall in the _ideal world_ sometimes we need to add tests for private methods (in ruby, are methods that are send to `self`)

#### 9.3.1 Ignoring private methods during tests
- You should try to tests `private` methods through public interface. **DRY**
- Usually private methods are unstable. Adding tests to them its accepting that we will be getting _test errors_ often
- **Important** Your tests should hide private methods, not expose them.

#### 9.3.2 Removing private methods from the class under test
- If **possible** avoid adding private methods
- This is unrealistic...
- If an object has several private methods, this could be a code smell and expose that we are breaking **Single Responsibility**

#### 9.3.3 Choosing to test a private method
- A `private method` is a way to defer today's decision.
- Maybe we need more details, so it's **cheaper** to wrap the ugly code in a private method

### 9.4 Testing outgoing messages
- Outgoing messages => also called `command` or `query`
- **Query** messages only matter to the objects they are send to
- **Command** messages have side effects that are visible through your apps

#### 9.4.1 Ignoring query messages
- Ignore messages that are enclosed, such as `self`
- Ignore queries that have no visibility in other app places
- Remember to address correctly the ownership of the test
```ruby
def gear_inches
  ration *  wheel.diameter # diameter needs to be tested in wheel, not here
end
```

#### 9.4.2 Proving command messages
- The object under test must be responsible for this test
- The assertion should validate that the message was sent/received. Not the actual return value
- **Mocks** are test for behavior
- **Mocks** let you assert that the message was sent
- **Mocks** that return values are only expected if they are required to continue the test
- In `well-designed` applications, testing outgoing messages should be easy

### 9.5 Testing duck types
- This sections works around **Testing roles**

#### 9.5.1 Testing roles
- Remember that **before** going through the **refactor**, you should have **tests**
- Your tests should document the existence of the `role`
- Defining the `role` test as a **module** allows you to write the test one and then reuse it for other roles.
- Defining the `role` test as a **module** It makes the `role` visible through the tests
- Remember to test both sides of the equation, `incoming-outgoing`

#### 9.5.2 Using Role Tests to validate doubles
- From the point of view of the object under test, every other object is a role.
- Having these roles as representatives, helps to reduce coupling and increases flexibility
- In statically typed languages, you can lean on the compiler to enforce the interfaces of roles
- While dynamically typed languages roles are _virtual_
- **Important** If you believe that **human communication will fail** to keep all the player of a role in sync, **write tests**

### 9.6 Testing inherited code
#### 9.6.1 Specifying the inherited interface
- One of the testing purposes is: _prove that all objects in this hierarchy honor their contract_
- Liskov: _Subtypes should be suitable for their supertypes_
- Violation of Liskov result in **objects that don't behave as expected**
- With tests we can define _what is an object_

#### 9.6.2 Specifying subclass responsibilities
- A good test for the hierarchy would be one that extracts common behavior 
- With these tests, you can ensure that subtypes are not drifting away

#### 9.6.3 Testing unique behavior
- Focus on subclasses
- Remember to write the minimum possible tests
- Creating a class that plays as _double of your object_ it's always good
- Be careful on testing subclass specializations to avoid knowledge of the superclass from leaking down into the subclass

### 9.7 Summary
- Tests are indispensable
- Well-designed apps are highly abstract and under constant pressure evolve
- Tests ensures that a change is good or bad
- Best tests are loosely coupled. They add value without increasing costs
