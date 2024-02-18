# Heap space

- Space in memory where objects are allocated
- Any object created here is global
- JRE classes live here
- Garbage Collector runs here

## Java Stack memory

- A thread is executed in a stack memory
- It uses a LIFO
- Smaller compared to Heap Space
- Stack memory contains references to objects in the block
- Once a thread releases the block, it becomes available for other threads

## Heap memory vs Stack memory

- Heap is used by all the parts of the application whereas stack is used only by one thread of execution
- Stack memory contains primitive values and references to objects in heap space
- Objects stored in the heap are globally accessible whereas stack memory can't be accessed by other threads
- Stack memory is short lived
