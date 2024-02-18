import { createDefaultTree } from "./util.mjs";

const tree = createDefaultTree();

const iterativeDfs = (root) => {
  const values = [];
  if (!root) {
    return values;
  }

  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    values.push(current.value);

    if (current.right) {
      stack.push(current.right);
    }

    if (current.left !== null) {
      stack.push(current.left);
    }
  }

  return values;
};

const recursiveDfs = (root) => {
  if (!root) {
    return [];
  }

  const leftValues = recursiveDfs(root.left);
  const rightValues = recursiveDfs(root.right);

  return [root.value, ...leftValues, ...rightValues];
};

console.log("====== Iterative");
const iterativeResult = iterativeDfs(tree);
console.log(iterativeResult);

console.log("=== Recursive");
const recursiveResult = recursiveDfs(tree);
console.log(recursiveResult);
