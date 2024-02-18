# Static keyword usage:

- Variables
  - Variable belongs to the class, not to the object.
  - They are not thread safe
- Methods
  - Method belongs to the class, not to the object.
  - Can only access to static variables and methods.
- Inner Class
  - Only for inner classes
- Block
  - Pieces of code, executed when a class is loaded into memory by the ClassLoader
  - We cannot access non-static variables inside this block
  - this block is executed only once
- Interface:
- import
  - to access static members on other classes (from Java 1.5)
