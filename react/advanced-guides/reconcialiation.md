## Reconciliation
- React provides a declarative API, so you don't worry about exactly what an update brought
- Updates are predictable

### Motivation
- You can think of `render()` function as creating a tree of React elements
- Then after a **props update** we need to `re-render`
- How does React knows what to re-render? React uses `O(n)` heuristic algorithm based on 2 assumptions
  1. 2 Elements of different types will produce different trees
  2. The developer can hint at which child element may be stable across different render with a key prop

### Diffing Algorithm
#### Elements of different types
- If we switch from `<a>` to `<img>` then a re-render occurs
- React deletes old tree and builds new from scratch
- When destroyed, any state associated with the old tree is lost

#### DOM elements of the same type
- When comparing 2 react DOM elements of the same type:
  - If only attributes change, then keeps the children and just update current element
  ```jsx
    <div className="before" title="stuff" />
    <div className="after" title="stuff" />
  ```
  - In this example only modifies the `className`
  - It happens the same with `styles`

#### Component elements of the same type
- When component updates:
  - Instance stays the same and it's maintained across renders

#### Recursing on Children
- React iterates through children (DOM and virtual DOM) at the same time, and generates a **mutation** whenever there's a difference
- It's preferred to add a element at the end, if you add it at the beginning it degrades the performance
- To solve this issue, use `key`
- Keep your `keys` unique (for siblings, not globally)
- Reorder are costly with component state when indexes are used as key
  - good: `${hashValue}-${item.index}`
  - bad: `item.index`