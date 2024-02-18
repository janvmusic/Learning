import { createDefaultTree } from "./util.mjs";

const tree = createDefaultTree();

const findInTreeDfs = (root, value) => {
  if (!root) {
    return false;
  }

  const nodes = [root];
  while (nodes.length > 0) {
    const current = nodes.pop();
    if (current.value === value) {
      return true;
    }

    if (current.right) {
      nodes.push(current.right);
    }

    if (current.left) {
      nodes.push(current.left);
    }
  }

  return false;
};

const findInTreeDfsRecursive = (root, value) => {
  if (!root) {
    return false;
  }

  if (root.value === value) {
    return true;
  }

  const leftResult = findInTreeDfsRecursive(root.left, value);
  const rightResult = findInTreeDfsRecursive(root.right, value);
  return leftResult || rightResult;
};

const findInTreeBfs = (root, value) => {
  if (!root) {
    return false;
  }

  const nodes = [root];
  while (nodes.length > 0) {
    const current = nodes.pop();
    if (current.value === value) {
      return true;
    }

    if (current.left) {
      nodes.unshift(current.left);
    }

    if (current.right) {
      nodes.unshift(current.right);
    }
  }

  return false;
};

console.log("====== Find in a tree: DFS");
const dfsResult = findInTreeDfs(tree, "f");
console.log("Iterative: ", dfsResult);

const dfsResultRecursive = findInTreeDfsRecursive(tree, "f");
console.log("Recursive: ", dfsResultRecursive);

console.log("====== Find in a tree: BFS");
const bfsResult = findInTreeBfs(tree, "f");
console.log(bfsResult);
