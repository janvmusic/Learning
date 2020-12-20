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
