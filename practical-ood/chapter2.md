## Chapter 2: Designing Classes with a Single Responsibility
- The foundation of OOP is the _message_
- The most visible part of the structure is the _class_
- Remember: **classes needs to be simple**
- Your goal is create a class that solves _right now_ problem and _be flexible_ to change later

### 2.1 Deciding what belongs to a class
#### 2.1.1 Grouping methods into classes
- The **classes** you create **will affect** how you think about **your application forever**
- You will never know less than you know right now.
- **Design** is more the art of pre
serving changeability than it is the act of achieving perfection.

#### 2.1.2 Organizing code to allow for easy changes
- Definition of **easy to change**
  1. Changes have **no side effects**
  2. **Small changes** correspond to **small changes in code**
  3. Existing code is **easy to reuse**
  4. The easiest way to make a change is to add **code that in itself is easy to change**
- Then our code need to have following qualities (TRUE)
  - Transparent: The **consequences** of the change should be **obvious**
  - Reasonable: balanced _cost_ vs _benefit_
  - Usable: **Reusable** for other contexts
  - Exemplary: Code itself should **encourage** those who change it **to perpetuate these qualities**

### 2.2 Creating class that have a Single Responsibility
- A class should do the smallest possible useful thing
- _Nouns_ represents the simplest candidates to be classes
- A candidate of a class required to have both _data & behavior_

#### 2.2.2 Why Single Responsibility Matters
- Reusable classes are **pluggable units** of well-defined behavior that have few entanglements
- They are like lego blocks.
- If responsibilities are so **coupled**, you cannot reuse the code you need, it means you might end up **duplicating code**
- With coupled code, any change could lead to a potential bug.

#### 2.2.3 Determining if a class has a Single Responsibility
- Ask **what methods do**: "Hey gear, what's your ration?", "Hello mr gear, what are your gear inches"?
- Try to describe a class within **one sentence**
  - If you find in the answer `and` that means the class has more than one responsibility
  - If you find in the answer `or` that means the class has more than one responsibility and they are not very related...
- **Highly cohesive**: When everything in a class is said to be related to its central purpose
- **Single Responsibility** means that everything the class does is highly related to its purpose

#### 2.2.4 Determining when to make design decisions
- Ask yourself: _"Whats the future cost of not doing today?"_
- When the future cost of doing nothing is the same as the current cost, postpone the decision.
- Remember: _The patterns that you establish today will be replicated forever_
- A good designer **understands this tension** (now or later) by making informed tradeoff between the needs of the present and the possibilities of the future

### 2.3 Writing code that embraces change
- Change is inevitable, coding in a changeable style has a big future payoffs.

#### 2.3.1 Depend on behavior, not data
- **Behavior** is captured in methods and invoked by sending messages.
- **DRY** tolerates change because any change in behavior can be made by changing code in just one place.
- Remember always **wrap** instance variables in **accessor methods**. This mean: _only one place to change_
- You should hide data from **yourself**
- Do not depend on `data` or `data structures`
```ruby
class ObscuringReferences
  attr_reader :data # this is wrong.. what is data?


  def initialize(data)
    @data = data
  end

  def diameters
    # 0 is rim, 1 is tire
    data.collect {|cell|
      cell[0] + (cell[1] * 2)
    }
  end

  # This would mean we need to know that data is an array of two elements...
  # @data = [[622,20],[622,23],[559, 30]]
```
- Depending on **data structures** for our models, it means that each sender of data must have a complete knowledge of what piece of data is at which index in the array
- If the **data structure** changes, then the code **must** change
- A way to solve this problem could be a `sentinel`
```ruby
class RevealingReferences
  attr_reader :wheels
  def initialize(data)
    @wheels = wheelify(data)
  end

  def diameters
    wheels.collect{|wheel|
      whee.rim + (wheel.tire *2)
    }
  end

  # A way to arrange attributes together without create a class
  Wheel = Struct.new(:rim, :tire) 
  def wheelify(data)
    data.collect{|cell|
      Wheel.new(cell[0], cell[1])
    }
  end
end
```

#### 2.3.2 Enforce Single Responsibility
- Extract extra responsibilities from methods
- Separating iteration from the action is a common case of _multiple responsibility_
- Example: _diameters_ calculates diameters for all wheels
```ruby
def diameters
  wheels.collect{|wheel| diameters(wheel)}
end

def diameter(wheel)
  wheel.rim + (wheel.tire * 2)
end
```
Another example: *gear_inches* method calculates wheel diameter
```ruby
def gear_inches
  ratio * diameter
end

def diameter
  rim + (tire * 2)
end
```
- These refactors are needed not because we know what _lies ahead_, instead they are needed because we can't _predict future_
- Having these small refactors uncover these benefits:
  - Expose previously hidden qualities: **Clarifies what the class does**
  - Avoid the need for comments: **The code is self explained**
  - Encourage Reuse
  - Are easy to move to another class
- Once we clean the class from **extra responsibilities** we can understand better the scope of it's purpose
- **Postpone design decision until you can't**
- Any decision made in advance **is just a guess**
- If you find that a class have several responsibilities then split the class

### 2.5 Summary
- Class that do one thing isolate that thing form the rest of your application
- This isolation allows change without consequence and reuse without duplication