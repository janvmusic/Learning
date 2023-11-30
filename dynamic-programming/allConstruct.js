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

const allConstructTabulated = (target, wordBank) => {
  const table = Array(target.length + 1)
    .fill()
    .map(() => []);

  // seeds
  table[0] = [[]];

  for (let i = 0; i < target.length; i++) {
    for (const word of wordBank) {
      const isSameWord = word === target.slice(i, i + word.length);
      if (!isSameWord) {
        continue;
      }

      const currentWays = table[i];
      const newWays = currentWays.map((way) => [...way, word]);
      table[i + word.length].push(...newWays);
    }
  }

  return table[target.length];
};

console.log("Memoized ======");
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
  allConstructMemoized("aaaaaaaaaaaaaaaaaaz", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
  ])
); //[];

console.log("Tabulated ======");
console.log(allConstructTabulated("", ["cat", "dog", "mouse"])); // [[]]
console.log(allConstructTabulated("hello", ["cat", "dog", "mouse"])); // []
console.log(
  allConstructTabulated("purple", ["purp", "p", "ur", "le", "purpl"])
); // [[purp, le], [p, ur, p, le]]
console.log(
  allConstructTabulated("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])
); // [[ab, cd, ef], [ab, c, def], [abc, def], [abcd, ef]]
console.log(
  allConstructTabulated("skateboard", [
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
  allConstructTabulated("aaaaaaaaaaaaaaaaaaz", [
    "a",
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
  ])
); //[];
