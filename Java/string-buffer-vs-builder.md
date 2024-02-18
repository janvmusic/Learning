# String vs StringBuffer vs StringBuilder

## StringBuffer

- Slower
- Thread safe
- Synchronized

## StringBuilder

- Not thread safe
- Not Synchronized
- Faster

## String in Java

- String is immutable
- String is final
- Strings are stored in the String pool
- Strings implement equals & hashCode
- Strings are thread safe
- Every time we concatenate 2 strings, a new string is created in the String pool.
- String class cannot be extended

## String manipulation

- String is immutable, so string manipulation operations lead to have created a new string
- The garbage collection comes and removes the old string
- StringBuffer and StringBuilder helps to manage better the string manipulation (concatenation, etc)

## StringBuffer vs StringBuilder vs String

- String is immutable and final, so it cannot be changed
- String lives in the string pool
- StringBuffer is thread safe
- StringBuilder is not thread safe
- String concatenation (since java \*) uses StringBuilder or buffer depending
