const allConstructRecursive = (target, wordBank) => {
  if (target === "") {
    return [[]];
  }

  const result = [];
  for (const word of wordBank) {
    if (target.indexOf(word) === 0) {
      const newTarget = target.slice(word.length);
      const resultedSuffixWays = allConstructRecursive(newTarget, wordBank);

      const targetWays = resultedSuffixWays.map((way) => [word, ...way]);
      result.push(...targetWays);
    }
  }

  return result;
};

const allConstructMemoized = (target, wordBank, memo = {}) => {
  if (target in memo) {
    return memo[target];
  }

  if (target === "") {
    return [[]];
  }

  const result = [];
  for (const word of wordBank) {
    if (target.indexOf(word) === 0) {
      const newTarget = target.slice(word.length);
      const resultedSuffixWays = allConstructMemoized(
        newTarget,
        wordBank,
        memo
      );

      const targetWays = resultedSuffixWays.map((way) => [word, ...way]);
      memo[target] = targetWays;
      result.push(...targetWays);
    }
  }

  return result;
};

console.log(allConstructMemoized("", ["cat", "dog", "mouse"])); // [[]]

console.log(allConstructMemoized("hello", ["cat", "dog", "mouse"])); // []

console.log(allConstructMemoized("purple", ["purp", "p", "ur", "le", "purpl"])); // [[purp, le], [p, ur, p, le]]

console.log(
  allConstructMemoized("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])
); // [[ab, cd, ef], [ab, c, def], [abc, def], [abcd, ef]]

console.log(
  allConstructMemoized("skateboard", [
    "bo",
    "rd",
    "ate",
    "t",
    "ska",
    "sk",
    "boar",
  ])
); // []

console.log(
  allConstructMemoized("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaz", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
  ])
);
[];
