import { Node } from "./tree.mjs";

export function createDefaultTree() {
  const a = new Node("a");
  const b = new Node("b");
  const c = new Node("c");
  const d = new Node("d");
  const e = new Node("e");
  const f = new Node("f");

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  return a;
}

export const createSumTree = () => {
  const a = new Node(3);
  const b = new Node(11);
  const c = new Node(4);
  const d = new Node(4);
  const e = new Node(2);
  const f = new Node(1);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  return a;
};

export const createMinTree = () => {
  const a = new Node(5);
  const b = new Node(11);
  const c = new Node(3);
  const d = new Node(4);
  const e = new Node(15);
  const f = new Node(12);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  return a;
};

export const createDiameterTree = () => {
  const a = new Node(5);
  const b = new Node(11);
  const c = new Node(3);
  const d = new Node(4);
  const e = new Node(2);
  const f = new Node(1);

  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;

  return a;
};
