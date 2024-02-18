// example 1: Same length
// Input: l1 = [2->4->3], l2 = [5->6->4]
// Output: [7->0->8]
// Explanation: 342 + 465 = 807.

// example 2: Different length
// Input: l1 = [2->4], l2 = [5->6->4]
// Output: [7->0->8]
// Explanation: 342 + 465 = 807.

class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const addNumbers = (first, second) => {
  let addsOne = false;
  let result = null;
  let current = null;

  while (first != null || second != null) {
    let firstValue = first?.value || 0;
    let secondValue = second?.value || 0;

    let addition = addsOne
      ? firstValue + secondValue + 1
      : firstValue + secondValue;

    addsOne = addition % 10 === 0;
    addition = addsOne ? 0 : addition;

    if (!result) {
      result = new LinkedList(addition);
      current = result;
    } else {
      const newNode = new LinkedList(addition);
      current.next = newNode;
      current = newNode;
    }

    // move to the next numbers
    first = first?.next;
    second = second?.next;
  }

  return result;
};

// Scenario #1: l1 = [2->4->3] + l2 = [5->6->4] = [7->0->8]
const f3 = new LinkedList(3);
const f2 = new LinkedList(4);
const f1 = new LinkedList(2);
f1.next = f2;
f2.next = f3;

const s3 = new LinkedList(4);
const s2 = new LinkedList(6);
const s1 = new LinkedList(5);
s1.next = s2;
s2.next = s3;

console.log("Scenario #1: ", addNumbers(f1, s1));

// Scenario #2: l1 = [2->4] + l2 = [5->6->4] = [7 -> 0 -> 5]
const f5 = new LinkedList(4);
const f4 = new LinkedList(2);
f4.next = f5;

const s6 = new LinkedList(4);
const s5 = new LinkedList(6);
const s4 = new LinkedList(5);
s4.next = s5;
s5.next = s6;

console.log("Scenario #2: ", addNumbers(f4, s4));
