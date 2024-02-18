# Dynamic Programming

This is a condensed knowledge for Dynamic programming (memoization & tabulation)

## Table of Contents

1. [Fibonacci](fibonacci.js)

- Memoization

  <img tag="fib" src="img/fibonacci-memo.png" width="300px">

- Tabulation

  <img tag="fib" src="img/fibonacci-tabulation.png" width="300px">

2. [Grid Traveler](gridTraveler.js)

- Memoization

  <img tag="grid traveler" src="img/grid-traveler-memo.png" width="300px">

- Tabulation

  <img tag="grid traveler" src="img/grid-traveler-tabulation.png" width="300px">

3. [Can Sum](canSum.js)

- Memoization

  <img tag="can sum" src="img/can-sum-memo.png" width="300px">

- Tabulation

  <img tag="can sum" src="img/can-sum-tabulation.png" width="300px">

4. [How Sum](howSum.js)

- Memoization

  <img tag="how sum" src="img/how-sum-memo.png" width="300px">

- Tabulation

  <img tag="how sum" src="img/how-sum-tabulation.png" width="300px">

5. [Can Construct](canConstruct.js)

- Memoization

  <img tag="can construct" src="img/can-construct-memo.png" width="300px">

- Tabulation

  <img tag="can construct" src="img/can-construct-tabulation.png" width="300px">

6. [Count Construct](countConstruct.js)

- Memoization

  <img tag="count construct" src="img/count-construct-memo.png" width="300px">

- Tabulation

  <img tag="count construct" src="img/count-construct-tabulation.png" width="300px">

7. [All Construct](allConstruct.js)

- Memoization

  <img tag="all construct" src="img/all-construct-memo.png" width="300px">

- Tabulation

  <img tag="all construct" src="img/all-construct-tabulation.png" width="300px">

## Memoization Recipe

1. Make it work

- Visualize the problem as a tree
- Implement the tree using recursion
- Test it

2. Make it efficient

- Add a memo object
- Add a base case to return memo values
- Store return values into the memo

## Tabulation Recipe

1. Create table of target size + 1
2. Initialize table with default values
3. Seed the trivial answer into the table
4. Iterate through the table
5. Update the table values

## Final Notes

<img tag="notes" src="img/notes.png" width="300px">

## Source

[Dynamic Programming - Learn to Solve Algorithmic Problems & Coding Challenges](https://www.youtube.com/watch?v=oBt53YbR9Kk)
