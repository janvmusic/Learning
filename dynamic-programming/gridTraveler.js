// base cases: gridTraveler(1, 1) = 1, gridTraveler(0, 1) = 0,
// gridTraveler(1, 0) = 0, gridTraveler(0, 0)

const recursiveGridTraveler = (m, n) => {
  if (n === 0 || m === 0) {
    return 0;
  }

  if (n === 1 && m === 1) {
    return 1;
  }

  return recursiveGridTraveler(m - 1, n) + recursiveGridTraveler(m, n - 1);
};

const memoizedGridTraveler = (m, n, memo = {}) => {
  if (n === 0 || m === 0) {
    return 0;
  }

  if (n === 1 && m === 1) {
    return 1;
  }

  const key = m + "," + n;
  if (key in memo) {
    return memo[key];
  }

  memo[key] =
    memoizedGridTraveler(m - 1, n, memo) + memoizedGridTraveler(m, n - 1, memo);
  return memo[key];
};

const tabulatedGridTraveler = (n, m) => {
  const grid = Array(n + 1)
    .fill()
    .map(() => Array(m + 1).fill(0));

  // base case
  grid[1][1] = 1;

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      const current = grid[i][j];
      const right = i + 1;
      const bottom = j + 1;

      if (right <= n) {
        grid[i + 1][j] += current;
      }

      if (bottom <= m) {
        grid[i][j + 1] += current;
      }
    }
  }

  return grid[n][m];
};

console.log("Memoized ======");
console.log(memoizedGridTraveler(1, 1));
console.log(memoizedGridTraveler(2, 3));
console.log(memoizedGridTraveler(3, 3));
console.log(memoizedGridTraveler(18, 18));

console.log("Tabulated ======");
console.log(tabulatedGridTraveler(1, 1));
console.log(tabulatedGridTraveler(2, 3));
console.log(tabulatedGridTraveler(3, 3));
console.log(tabulatedGridTraveler(18, 18));
