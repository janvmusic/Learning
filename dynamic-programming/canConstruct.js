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
