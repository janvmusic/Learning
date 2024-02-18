import { createDiameterTree } from "./util.mjs";

const tree = createDiameterTree();

const calculateMaxRootToLeafPathSum = (tree) => {
  if (!tree) {
    return 0;
  }

  if (!tree.left && !tree.right) {
    return tree.value;
  }

  const left = calculateMaxRootToLeafPathSum(tree.left);
  const right = calculateMaxRootToLeafPathSum(tree.right);

  return tree.value + Math.max(left, right);
};

console.log("Max root to leaf path sum ", calculateMaxRootToLeafPathSum(tree));
