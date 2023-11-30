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

/**
 * time: o(n)
 * space: o(n)
 */
const tabulatedFibonacci = (n) => {
  const fibSize = n + 1;
  const table = Array(fibSize).fill(0);
  table[1] = 1;

  for (let i = 0; i < fibSize; i++) {
    const next = i + 1;
    const afterNext = next + 1;
    const currentFib = table[i];

    if (next < fibSize) {
      const nextFib = table[next];
      table[next] = nextFib + currentFib;
    }

    if (afterNext < fibSize) {
      const afterNextFib = table[next + 1];
      table[afterNext] = afterNextFib + currentFib;
    }
  }

  return table[n];
};

console.log("Memoized ======");
console.log(memoizedFibonacci(6));
console.log(memoizedFibonacci(7));
console.log(memoizedFibonacci(8));
console.log(memoizedFibonacci(50));

console.log("Tabulated ======");
console.log(tabulatedFibonacci(6));
console.log(tabulatedFibonacci(7));
console.log(tabulatedFibonacci(8));
console.log(tabulatedFibonacci(50));
