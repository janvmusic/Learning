# ClassLoader

## What is a class loader?

- Java programs run in the JVM
  The JVM creates the bytecode, which is platform independent.
- The bycode is the `.class` file
- The classloader is in charge of loading in memory the `.class` files

## Types of class loader

- Bootstrap class loader: loads the JDK internals. For example java.lang.\*
- Extension class loader: loads the JDK extensions directory
- System class loader: loads the classpath

## Hierarchy

- The class loader is hierarchical
- Class loading ensures the uniqueness of the class in runtime
- The class loader is a tree
