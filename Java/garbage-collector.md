# Garbage Collector

- In Java the memory management is taken care by the Garbage Collector.
- The Garbage Collector is a daemon thread that runs in the background.
- Basically, destroys objects in the Heap Memory
- Unreachable objects means that the object is not referenced by any part of the program

## How does it work?

- Marking is the act of finding non-reachable objects by the garbage collector
- JVM uses the Generational Garbage Collector
- The Heap is divided into 3 parts:
  - Young Generation
  - Old Generation
  - Permanent Generation

## Types

- Serial Garbage Collector: Simple and for small heap sizes
- Parallel Garbage Collector: For multiprocessor machines and Java 8 default
- CMS Garbage Collector: Takes advantage of multiple processors,
- G1 Garbage Collector: For multiprocessor machines, divides the heap into regions and uses multiple threads to scan them in parallel
