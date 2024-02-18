# What is an exception?

- It's an event that can happen during the execution of a program and disrupts the normal flow of instructions.
- the error could be: data, hardware, software, environment, user error, etc.
- When the JRE finds an exception it tries to find the handler for it.

## Exception handler keywords

- try/catch
- throw
- throws
- finally

## Hierarchy

- Throwable
- Error: unrecoverable.
  - OutOfMemoryError
  - IOError
- Exception: recoverable.
  - NullPointerException
  - IOException
  - RuntimeException
    - ArithmeticException
    - ArrayIndexOutOfBoundsException
    - ClassCastException
    - IllegalArgumentException
    - NumberFormatException
    - SecurityException

## Checked vs Unchecked

- Checked: compiler checks for it.
  - try/catch blocks are used
  - throws keyword is used
  - throw keyword as well
  - Superclass: Exception
- Unchecked: compiler doesn't check for it.
  - Superclass: RuntimeException

## Multicatch (Java 7)

- You can catch multiple exceptions in the same catch block.

```java
catch (IOException | SQLException ex) {
  logger.log(ex);
  throw ex;
}
```

## final vs finally vs finalize

- final & finally are keywords
- finalize is a method
- final restrics a variable to be assigned, a method to be overridden, or a class to be extended.
- finally represents the last instruction when a exception happens, it must be executed.
- finalize is called by the garbage collector when it's about to destroy an object.
