## Chapter 3: Managing Dependencies
- OOP languages contend that they are efficient and effective because of the way they model reality
- A single object cannot know everything, so inevitably it will have to talk to another object
- All of the behavior (of an app) is dispersed among objects. So for any desired behavior either:
  - Object knows it
  - Objects inherits
  - Knows another object that knows it
- _Knowing_ creates a dependency

### 3.1 Understanding dependencies
- An **object depends** on another object if, when one object changes, the other might be **forced to change in turn.**

#### **3.1.1 Recognizing dependencies**
- An object has dependencies when it knows:
  - The name of another class
  - The name of a message that its intended for another object
  - The arguments that message requires
  - The order of the arguments
- **Remember** Some degree of dependency is required/inevitable.
- Each of these dependencies makes changes difficult
- The challenge as _Designers_ is to create classes with the minimum possible dependencies

#### **3.1.2 Coupling between objects**
- The **more** a object knows about another, the more **tightly coupled** they are

#### **3.1.3 Other dependencies**
- **Message chaining** creates a dependency between the original object and every object that receives the message
- **Test depending code**

### 3.2 Writing Loosely couple code
- Recognize which dependencies are required and which are not
- An objects becomes less useful when it knows too much about other objects; If it knew less, it could do more

#### **3.2.1 Injecting dependencies**
- Recognize that the responsibility for knowing the name of a message and the name of a class may belong in different objects.

#### **3.2.2 Isolate dependencies**
- Switch you gears from _Achieve perfection_ to _improve the overall situation_
- Therefore, if you cannot remove unnecessary dependencies, then **isolate them**
  - Isolate instance creation; Reduce it's reach to your class
- Examples
```ruby
class Gear
  attr_reader :chainring, :cog, :wheel

  def initialize(chainring, cog, rim, tire)
    @chainring = chainring
    @cog       = cog
    @wheel     = Wheel.new(rim, tire)
  end

  def ratio
    chainring / cog.to_f
  end

  def gear_inches
    # tire goes around rim twice for diameter
    ratio * wheel.diameter
  end
end
```
- Example #2
```ruby
class Gear
  attr_reader :chainring, :cog, :rim, :tire

  def initialize(chainring, cog, rim, tire)
    @chainring = chainring
    @cog       = cog
    @rim       = rim
    @tire      = tire
  end

  def ratio
    chainring / cog.to_f
  end

  def gear_inches
    # tire goes around rim twice for diameter
    ratio * wheel.diameter
  end

  def wheel
    @wheel ||= Wheel.new(rim, tire)
  end
end
```
- In both examples `Gear` knows far too much, but `Wheel` is isolated to the scope of this class.
- If you are **mindful of dependencies** and develop a habit of routinely **injecting them**, you classes will naturally be **loosely coupled**.
- **Remember** Any time you change something, you stand the chance of breaking it
- **Isolating a reference** provides some insurance against being affected by change.

#### **3.2.3 Remove argument-order dependency**
- Knowing the required arguments to send a message it's something unavoidable
- Then this creates an specific dependency: **Know the order of the arguments**
- If language allows, use **Keyword Arguments**
```ruby
class Gear
  attr_reader :chainring, :cog, :wheel

  def initialize(chainring:, cog:, wheel:)
    @chainring = chainring
    @cog       = cog
    @wheel     = wheel
  end

  # ...
def
```
- arguments end with `:` which denotes they are **Keyword arguments**
- **Keyword arguments** can be passed in any order: `hash` or explicit keyword
- As general rule, prefer **Keyword arguments**
- Remember to use `default` values while using **Keyword arguments**
```ruby
class Gear
  attr_reader :chainring, :cog, :wheel

  def initialize(chainring: 40, cog: 18, wheel: default_wheel)
    @chainring = chainring
    @cog       = cog
    @wheel     = wheel
  end

  # ...
def
```
- **Factory** an object that it's solely purpose it's create objects
- Avoid external dependencies to dictate your code. Remember to use wrappers

### 3.3 Managing Dependency Direction
#### **3.3.1 Reversing Dependencies**
- A dependency is a collaboration and can be reversed

#### **3.3.2 Choosing Dependency Direction**
- _Depend on things that change less often than you do_
- This fact lies in 3 ideas:
  - Some classes change more than others
  - Concrete class are more likely to change, than abstract classes
  - Changing a class that has many dependents will result in widespread consequences
- Code changes happens also in Frameworks as in languages. Assess these changes
- An **interface** is an abstraction of the idea that a certain category of things will have a diameter
- **Abstractions** are more stable than a concrete class. They act like contracts
- **Beware** of concrete classes that have many dependents. They are dangerous

#### **3.4 Summary**
- Injecting dependencies creates loosely coupled objects (Composition)
- Isolating dependencies allows objects to quickly adapt to unexpected changes
- Depending on abstractions decreases the likelihood of facing these changes
- They key to managing dependencies is to control their direction

### Question
- How do you define _dependency inversion_?