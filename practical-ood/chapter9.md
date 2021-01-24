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
