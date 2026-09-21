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

  insert(value, root = this.root) {
    let newNode = new Node(value);
    if (root === null) {
      this.root = newNode;
      return;
    }

    if (root.value === value) {
      return;
    }

    if (root.value > value && root.leftChild === null) {
      return (root.leftChild = newNode);
    }

    if (root.value < value && root.rightChild === null) {
      return (root.rightChild = newNode);
    }

    if (root.value < value) {
      return this.insert(value, root.rightChild);
    }

    if (root.value > value) {
      return this.insert(value, root.leftChild);
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

const testTree = new Tree([]);
//console.log(testTree.root);
// prettyPrint(testTree.root);
//console.log(testTree.includes(7));
console.log(testTree.insert(18));
prettyPrint(testTree.root);

//prettyPrint(testTree.root);
