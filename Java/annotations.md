# Annotations

## What is an annotation?

- it is metadata about the program embedded in the program itself

## Properties of an annotation

- It can be parsed by the Annotation parsing tool or the compiler
- They can be used during compile time or runtime
- Creating an annotation is similar to creating an interface
- it uses the `@`
- it is a `@interface`
- Annotation cannot have parameters
- Annotation cannot extend other annotations
- Annotation return types are limited, primitives, string, enums, annotation or array of these
- Annotation can have default values

## Types of annotations

- @Documented: Javadoc uses it to know that need to be documented
- @Target:
- @Inherited
- @Retention
- @Repeatable

### built-in

- @Override: Indicates the compiler that we are overriding a method
- @Deprecated: Do not use method annotation
- @SuppressWarnings: Suppresses compiler warnings
- @FunctionalInterface:
- @SafeVarargs: A programmer assertion that the body of the annotated method or constructor does not perform potentially unsafe operations on its varargs parameter.
