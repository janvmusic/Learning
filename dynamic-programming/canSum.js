/**
 * time: o(n^m)
 * space: o(m)
 */
const canSumRecursive = (targetSum, numbers) => {
  if (targetSum === 0) {
    return true;
  }

  if (targetSum < 0) {
    return false;
  }

  for (let num of numbers) {
    const remainder = targetSum - num;
    if (canSumRecursive(remainder, numbers)) {
      return true;
    }
  }

  return false;
};

/**
 * time: o(m * n)
 * space: o(m)
 */
const canSumMemoized = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) {
    return memo[targetSum];
  }

  if (targetSum === 0) {
    return true;
  }

  if (targetSum < 0) {
    return false;
  }

  for (let num of numbers) {
    const remainder = targetSum - num;
    if (canSumMemoized(remainder, numbers, memo)) {
      memo[targetSum] = true;
      return memo[targetSum];
    }
  }

  memo[targetSum] = false;
  return false;
};

const canSumTabulated = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(false);
  // 0 is always achievable no matter which numbers we have
  table[0] = true;

  for (let i = 0; i < table.length; i++) {
    const currentSum = table[i];
    if (!currentSum) {
      continue;
    }

    for (let j = 0; j < numbers.length; j++) {
      const nextTarget = i + numbers[j];
      if (nextTarget >= table.length) {
        continue;
      }

      // then the next target is the sum of i + j and can be calculated
      table[nextTarget] = true;
    }
  }

  return table[targetSum];
};

console.log("Memoized ======");
console.log(canSumMemoized(7, [2, 3])); // true
console.log(canSumMemoized(7, [5, 3, 4, 7])); // true
console.log(canSumMemoized(7, [2, 4])); // false
console.log(canSumMemoized(8, [2, 3, 5])); // true
console.log(canSumMemoized(300, [7, 14])); // false

console.log("Tabulated ======");
console.log(canSumTabulated(7, [2, 3])); // true
console.log(canSumTabulated(7, [5, 3, 4, 7])); // true
console.log(canSumTabulated(7, [2, 4])); // false
console.log(canSumTabulated(8, [2, 3, 5])); // true
console.log(canSumTabulated(300, [7, 14])); // false
