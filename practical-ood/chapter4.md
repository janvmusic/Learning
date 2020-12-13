## Chapter 4: Creating flexible interfaces 
- Instead of concern of what classes look like, we should be aware of what messages are send
- Design, must be concerned with the messages passed between objects, not only with that they know or who they know
- The conversation between objects occurs in their _interface_
- **Classes** reflect what's on your repository, while **messages** reflect the living, animated application

### 4.1 Understanding interfaces
- Not all **methods** needs to be treated equally, some of them are more _general_ than others. They are more likely to change
- What a class _reveals_ is part of its **interface**
- `Classes` implements _methods_; some of those methods are meant to be used by other `Classes`, and these methods make up its **public interface**
- `interface` === `set of messages`

### 4.2 Defining interfaces
- The distinction between **public** and **private** exists because it is the most effective way to do business
- The class exists to fulfill a single responsibility but implements many methods
- Remember how we define Kitchen example

#### 4.2.1 Public Interfaces
- `Public methods`: They are the **face** of your class **to the world**.
  - Reveal it's final **responsibility**
  - Are expected to be **invoked** by other classes
  - Likely **not** to **change**
  - Safe to **depend on**
  - Documented in tests

#### 4.2.2 Private interfaces
- All other methods are part of the private interface
  - Handle implementation **details**
  - Are **not** expected **to be used** by other objects
  - Prone to **change**
  - Not dependable
  - Not references in tests

#### 4.2.3 Responsibilities, dependencies & interfaces
- **Public** methods should be read as the _description of class' responsibilities_
- The **public interface** is a **contract** that articulates the **responsibilities** of your class
- Remember: `public => stable` while `private => changeable`
- When your `object` depends on a _public method_ is implicit that these methods are stable
- If you `object` depends on a _private methods_ is implicit that the implementation might change... Don't do this

### 4.3 Finding the public interface
- Its not a recipe 
- The design goal is to retain maximum future flexibility while writing only enough code to meet today's requirements
- **Good** public interfaces reduce the cost of change; **Bad** public interfaces raise the cost of change.

#### 4.3.2 Constructing an intention
-  _Domain Objects_ are the nouns in the application, they represent data & behavior. They are easy to find
- _Design experts_ notice this domain knowledge, however, they concentrate on the **message** these classes want to pass
- These **messages** allows you to **discover less obvious objects** that the application might require
- You should form an **intention** about the **objects and the messages** needed to satisfy this use case

#### 4.3.3 Using sequence diagram
- `UML`: Unified Modeling Language
- UML provides a visual example of how objects might communicate between them in a use case
- UML helps you to understand _intention & interaction_
- **Message-based** perspective yields more flexible applications.
- It changes the question, from: "I know I need this class, what should it do?" to **"I need to send this message, who should respond it?"**
- _You don't send message because you have objects, you have objects because you send messages_

#### 4.3.4 Asking for "What" instead of "How"
- Understand the difference between, a message which ask "what" and "how" is subtle 
- A side effect on switch from "how" to "what" this will reduce the public interface.
- Small public interface means that other objects depends on **stable** methods

#### 4.3.5 Seeking context independence
- What an object knows about other object, makes it's **context**
- **The context** that an object expects has a direct effect on how **difficult is to reuse**
- The best possible design is an object that can honor its responsibility without knowing others (**Context independent**)
- A way to do this is via **dependency inversion** & focus on what the object **wants**

#### 4.3.6 Trusting other objects
- Blind trust is a keystone if OOD, it allows objects to collaborate without binding themselves to context
- Switches from:
  - Step one: "I know what I want, and I know how you do it"
  - Step two: "I know what I want, and I know what you do"
  - Step three: "I know what I want, and I trust you to do it"

### 4.4 Writing code that puts its best (Inter)Face Forward
- The clarity in your interface reveals your design skills and reflects your self-discipline
- It is more important that a well-defined interface exists than it be perfect
- _Think_ about interfaces, create them intentionally

#### 4.4.1 Create explicit interfaces
- Thumb rules for this:
  - Be explicit on which methods are public
  - Be more about `what` than `how`
  - Names likely not to change
  - Prefer keyword arguments
- Remember to communicate other devs which methods are **stable(public)** and which are not

#### 4.4.2 Honor the public interfaces of others
- If your design forces a `private` method to be `public`, re-think your design. Give it a second change on what would you do.
- If required, remember to `isolate` dependency

#### 4.4.4 Minimize context
- Construct public interfaces with an eye toward minimizing the context they require from others.
- Keep the "what" vs "how" in mind

### 4.5 Law of Demeter
#### 4.5.1 Defining Demeter
- "Only talk to your immediate neighbors"
- "Use only one dot"
Example:  
```ruby
customer.bicycle.wheel.tire # this is wrong
```

#### 4.5.2 Avoiding violation
- One way to avoid `chain calls` is to use a _delegate_
- _delegate_ is send a message to another object, often via **wrapper**
- Using delegation does not solve this.

#### 4.5.4 Listening to Demeter
- Within the _chain calls_ we can find a problem: "There's some behavior way over there that I need right here, an I know to get it"
- These types of call only tells you what is missing in the public interface
