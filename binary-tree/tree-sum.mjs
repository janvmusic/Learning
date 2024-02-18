import { createSumTree } from "./util.mjs";

const tree = createSumTree();

const sumTreeRecursive = (tree) => {
  if (!tree) {
    return 0;
  }

  const left = sumTreeRecursive(tree.left);
  const right = sumTreeRecursive(tree.right);

  return tree.value + left + right;
};

const sumTreeIterative = (tree) => {
  let total = 0;
  if (!tree) {
    return total;
  }

  const stack = [tree];
  while (stack.length > 0) {
    const current = stack.pop();
    total += current.value;

    if (current.left) {
      stack.push(current.left);
    }

    if (current.right) {
      stack.push(current.right);
    }
  }

  return total;
};

console.log("====== Sum tree");
const result = sumTreeRecursive(tree);
console.log("Recursive Total: ", result);

const res = sumTreeIterative(tree);
console.log("Iterative Total: ", res);
