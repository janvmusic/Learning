const countConstructRecursive = (target, wordBank) => {
  if (target === "") {
    return 1;
  }

  let totalCount = 0;
  for (let word of wordBank) {
    if (target.indexOf(word) === 0) {
      const newTarget = target.slice(word.length);
      const numWaysForRest = countConstructRecursive(newTarget, wordBank);
      totalCount += numWaysForRest;
    }
  }

  return totalCount;
};

const countConstructMemo = (target, wordBank, memo = {}) => {
  if (target in memo) {
    return memo[target];
  }

  if (target === "") {
    return 1;
  }

  let totalCount = 0;
  for (let word of wordBank) {
    if (target.indexOf(word) === 0) {
      const newTarget = target.slice(word.length);
      const numWaysForRest = countConstructMemo(newTarget, wordBank, memo);
      totalCount += numWaysForRest;
    }
  }

  memo[target] = totalCount;
  return totalCount;
};

console.log(countConstructMemo("purple", ["purp", "p", "ur", "le", "purpl"])); // 2
console.log(countConstructMemo("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log(
  countConstructMemo("skateboard", [
    "bo",
    "rd",
    "ate",
    "t",
    "ska",
    "sk",
    "boar",
  ])
); // 0
console.log(
  countConstructMemo("enterapotentpot", [
    "a",
    "p",
    "ent",
    "enter",
    "ot",
    "o",
    "t",
  ])
); // 4
console.log(
  countConstructMemo("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
  ])
); // 0
