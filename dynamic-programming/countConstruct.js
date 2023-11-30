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

const countConstructTabulated = (target, wordBank) => {
  const table = Array(target.length + 1).fill(0);
  table[0] = 1;

  for (let i = 0; i < target.length; i++) {
    const current = table[i];
    if (current === 0) {
      continue;
    }

    for (const word of wordBank) {
      const isSameWord = word === target.slice(i, i + word.length);
      if (!isSameWord) {
        continue;
      }

      table[i + word.length] += table[i];
    }
  }

  return table[target.length];
};

console.log("Memoized ======");
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

console.log("Tabulated ======");
console.log(
  countConstructTabulated("purple", ["purp", "p", "ur", "le", "purpl"])
); // 2
console.log(
  countConstructTabulated("abcdef", ["ab", "abc", "cd", "def", "abcd"])
); // 1
console.log(
  countConstructTabulated("skateboard", [
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
  countConstructTabulated("enterapotentpot", [
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
  countConstructTabulated("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
  ])
); // 0
