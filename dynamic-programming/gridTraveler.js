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

console.log(memoizedGridTraveler(1, 1));
console.log(memoizedGridTraveler(2, 3));
console.log(memoizedGridTraveler(3, 3));
console.log(memoizedGridTraveler(18, 18));
