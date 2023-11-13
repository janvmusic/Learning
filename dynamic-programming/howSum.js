const howSumRecursive = (targetSum, numbers) => {
  if (targetSum === 0) {
    return [];
  }

  if (targetSum < 0) {
    return null;
  }

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = howSumRecursive(remainder, numbers);

    if (remainderResult !== null) {
      return [...remainderResult, num];
    }
  }

  return null;
};

const howSumMemoized = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) {
    return memo[targetSum];
  }

  if (targetSum === 0) {
    return [];
  }

  if (targetSum < 0) {
    return null;
  }

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = howSumMemoized(remainder, numbers, memo);

    if (remainderResult !== null) {
      memo[targetSum] = [...remainderResult, num];
      return memo[targetSum];
    }
  }

  memo[targetSum] = null;
  return memo[targetSum];
};

console.log(howSumMemoized(7, [2, 3])); // [3, 2, 2]
console.log(howSumMemoized(7, [5, 3, 4, 7])); // [4, 3]
console.log(howSumMemoized(7, [2, 4])); // null
console.log(howSumMemoized(8, [2, 3, 5])); // [2, 2, 2, 2]
console.log(howSumMemoized(300, [7, 14])); // null
