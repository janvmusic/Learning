/**
 * time: o(2^n)
 * space: o(n)
 */
const recursiveFibonacci = (n) => {
  if (n <= 2) {
    return 1;
  }

  return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
};

/**
 * time: o(n)
 * space: o(n)
 */
const memoizedFibonacci = (n, memo = {}) => {
  if (n in memo) {
    return memo[n];
  }

  if (n <= 2) {
    return 1;
  }

  memo[n] = memoizedFibonacci(n - 1, memo) + memoizedFibonacci(n - 2, memo);
  return memo[n];
};

console.log(memoizedFibonacci(50));
