class Node {
  constructor(value, leftChild = null, rightChild = null) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(this.sortArr(array));
  }

  sortArr(array) {
    let sortedArray = [...array].sort((a, b) => a - b);
    let uniqueArray = [...new Set(sortedArray)];
    return uniqueArray;
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }

    let mid = Math.round((start + end) / 2);
    let root = new Node(array[mid]);

    root.leftChild = this.buildTree(array, start, mid - 1);
    root.rightChild = this.buildTree(array, mid + 1, end);

    return root;
  }

  includes(value, root = this.root) {
    if (root === null) {
      return false;
    }
    if (root.value === value) {
      return true;
    }

    if (root.value < value) {
      return this.includes(value, root.rightChild);
    }
    
    if (root.value > value) {
      return this.includes(value, root.leftChild);
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
//console.log(testTree.root);
// prettyPrint(testTree.root);
console.log(testTree.includes(7));