const canConstructRecursive = (target, wordBank) => {
  if (target === "") {
    return true;
  }

  for (let word of wordBank) {
    // its at the beginning
    if (target.indexOf(word) === 0) {
      const newTarget = target.slice(word.length);

      if (canConstructRecursive(newTarget, wordBank)) {
        return true;
      }
    }
  }

  return false;
};

const canConstructMemo = (target, wordBank, memo = {}) => {
  if (target in memo) {
    return memo[target];
  }

  if (target === "") {
    return true;
  }

  for (let word of wordBank) {
    // its at the beginning
    if (target.indexOf(word) === 0) {
      const newTarget = target.slice(word.length);

      if (canConstructMemo(newTarget, wordBank, memo)) {
        memo[target] = true;
        return true;
      }
    }
  }

  memo[target] = false;
  return false;
};

const canConstructTabulated = (target, wordBank) => {
  const table = Array(target.length + 1).fill(false);
  table[0] = true;

  for (let i = 0; i < target.length; i++) {
    const current = table[i];
    if (!current) {
      continue;
    }

    for (const word of wordBank) {
      const isSameWord = word === target.slice(i, i + word.length);
      if (!isSameWord) {
        continue;
      }

      table[i + word.length] = true;
    }
  }

  return table[target.length];
};

console.log("Memoized ======");
console.log(canConstructMemo("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // true
console.log(
  canConstructMemo("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
); // false
console.log(canConstructMemo("", ["cat", "dog", "mouse"])); // true
console.log(
  canConstructMemo("enterapotentpot", [
    "a",
    "p",
    "ent",
    "enter",
    "ot",
    "o",
    "t",
  ])
); // true
console.log(
  canConstructMemo("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
  ])
); // false

console.log("Tabulated ======");
console.log(
  canConstructTabulated("abcdef", ["ab", "abc", "cd", "def", "abcd"])
); // true
console.log(
  canConstructTabulated("skateboard", [
    "bo",
    "rd",
    "ate",
    "t",
    "ska",
    "sk",
    "boar",
  ])
); // false
console.log(canConstructTabulated("", ["cat", "dog", "mouse"])); // true
console.log(
  canConstructTabulated("enterapotentpot", [
    "a",
    "p",
    "ent",
    "enter",
    "ot",
    "o",
    "t",
  ])
); // true
console.log(
  canConstructTabulated("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
  ])
); // false
