import { createMinTree } from "./util.mjs";

const tree = createMinTree();

const findTreeMinIterative = (tree) => {
  let min = Infinity;
  if (!tree) {
    return min;
  }

  const stack = [tree];
  while (stack.length > 0) {
    const current = stack.pop();
    if (min > current.value) {
      min = current.value;
    }

    if (current.right) {
      stack.push(current.right);
    }

    if (current.left) {
      stack.push(current.left);
    }
  }

  return min;
};

const findTreeMinRecursive = (tree) => {
  if (!tree) {
    return Infinity;
  }

  const left = findTreeMinRecursive(tree.left);
  const right = findTreeMinRecursive(tree.right);

  return Math.min(tree.value, left, right);
};

console.log("====== Sum tree");
const result = findTreeMinIterative(tree);
console.log("Iterative Total: ", result);

const res = findTreeMinRecursive(tree);
console.log("Recursive Total: ", res);
