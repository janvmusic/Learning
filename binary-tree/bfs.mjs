import { createDefaultTree } from "./util.mjs";

const tree = createDefaultTree();

const iterativeBfs = (root) => {
  const values = [];
  if (!root) {
    return values;
  }

  const queue = [root];
  while (queue.length > 0) {
    const current = queue.pop();
    values.push(current.value);

    if (current.left) {
      queue.unshift(current.left);
    }

    if (current.right) {
      queue.unshift(current.right);
    }
  }

  return values;
};

console.log("====== Iterative");
const iterativeResult = iterativeBfs(tree);
console.log(iterativeResult);
