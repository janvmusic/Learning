// bestSum(7, [5, 3, 4, 7]) => [7] or [3, 4]
const bestSumRecursive = (targetSum, numbers) => {
  if (targetSum === 0) {
    return [];
  }

  if (targetSum < 0) {
    return null;
  }

  let shortestCombination = null;
  for (let number of numbers) {
    const remainder = targetSum - number;
    const remainderCombination = bestSumRecursive(remainder, numbers);

    if (remainderCombination) {
      const combination = [...remainderCombination, number];

      const isShorterCombination =
        shortestCombination === null ||
        combination.length < shortestCombination.length;

      if (isShorterCombination) {
        shortestCombination = combination;
      }
    }
  }

  return shortestCombination;
};

const bestSumMemoized = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) {
    return memo[targetSum];
  }

  if (targetSum === 0) {
    return [];
  }

  if (targetSum < 0) {
    return null;
  }

  let shortestCombination = null;
  for (let number of numbers) {
    const remainder = targetSum - number;
    const remainderCombination = bestSumMemoized(remainder, numbers, memo);

    if (remainderCombination) {
      const combination = [...remainderCombination, number];

      const isShorterCombination =
        shortestCombination === null ||
        combination.length < shortestCombination.length;

      if (isShorterCombination) {
        shortestCombination = combination;
        memo[targetSum] = shortestCombination;
      }
    }
  }

  return shortestCombination;
};

const bestSumTabulated = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(null);
  table[0] = [];

  for (let i = 0; i < targetSum; i++) {
    const current = table[i];
    if (!current) {
      continue;
    }

    for (const num of numbers) {
      const currentBestSum = table[i + num];
      const newWay = [...current, num];

      if (!currentBestSum || newWay.length < currentBestSum.length) {
        table[i + num] = [...newWay];
      }
    }
  }

  return table[targetSum];
};

console.log("Memoized ======");
console.log(bestSumMemoized(7, [5, 3, 4, 7])); // [7]
console.log(bestSumMemoized(8, [2, 3, 5])); // [3, 5]
console.log(bestSumMemoized(8, [1, 4, 5])); // [4, 4]
console.log(bestSumMemoized(100, [1, 2, 5, 25])); // [25, 25, 25, 25]

console.log("Tabulated ======");
console.log(bestSumTabulated(7, [5, 3, 4, 7])); // [7]
console.log(bestSumTabulated(8, [2, 3, 5])); // [3, 5]
console.log(bestSumTabulated(8, [1, 4, 5])); // [4, 4]
console.log(bestSumTabulated(100, [1, 2, 5, 25])); // [25, 25, 25, 25]
