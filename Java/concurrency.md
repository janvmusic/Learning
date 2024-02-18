# Process

- Self contained execution environment
- It can be seen as a program in execution
- A program contains multiple `processes` inside

# Thread

- A thread is a lightweight process
- A thread is a unit of execution
- A thread uses less resources than a process
- Once we create a thread, we cannot ensure the execution order of the threads. The JVM decides which thread to execute first.
- However, threads have priorities. The JVM uses priorities to decide which thread to execute first.

## Thread Benefits

- Threads share the same data and code from its parent
- Context switching is less expensive than process switching
- Thread intercommunication is easier than process intercommunication

## How to create a thread?

- Extend the `Thread` class
- Implement the `Runnable` interface

## Runnable vs Thread

- Runnable when you class does more than just running a thread
- Thread if you class is only running a thread as main goal

# Multithreading
