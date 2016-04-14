
var BinarySearchTree = function () {
  this.count = 0;
  this._root = null;
};

BinarySearchTree.prototype._makeNode = function (value) {
  return {value: value, left: null, right: null};
};

BinarySearchTree.prototype._addNode = function (node, value) {
  if (node === null) {
    node = this._makeNode(value);
  } else if (value < node.value) {
    if (node.left === null) {
      node.left = this._makeNode(value);
    } else {
      this._addNode(node.left, value);
    }
  } else {
    if (node.right === null) {
      node.right = this._makeNode(value);
    } else {
      this._addNode(node.right, value);
    }
  }
};

BinarySearchTree.prototype._getNode = function (node, value) {
  if (node === null) {
    return null;
  } else if (value === node.value) {
    return node;
  } else if (value < node.value) {
    return this._getNode(node.left, value);
  } else {
    return this._getNode(node.right, value);
  }
};

BinarySearchTree.prototype._getParentNode = function (node, value) {
  if (value < node.value) {
    if (value === node.left.value) {
      return node;
    } else {
      return this._getParentNode(node.left, value);
    }
  } else {
    if (value === node.right.value) {
      return node;
    } else {
      return this._getParentNode(node.right, value);
    }
  }
};

BinarySearchTree.prototype._getParent = function (value) {
  if (this.count < 2 || this._root === null || this._root.value === value) {
    return null;
  } else {
    return this._getParentNode(this._root, value);
  }
};

BinarySearchTree.prototype.contains = function (value) {
  if (this._getNode(this._root, value) === null) {
    return false;
  } else {
    return true;
  }
};

BinarySearchTree.prototype.insert = function (value) {
  if (this._root === null) {
    this._root = this._makeNode(value);
  } else {
    this._addNode(this._root, value);
  }
  this.count++;
};

BinarySearchTree.prototype.remove = function (value) {
  var nodeToRemove = this._getNode(this._root, value);
  var parentNode;
  var largestOnLeft;
  var largestOnLeftParent;
  var parentIsTheNodeToRemove;

  if (nodeToRemove === null) {
    return false;
  }

  if (this.count === 1) {
    this._root = null;
    this.count = 0;
    return true;
  }

  parentNode = this._getParent(value);

  // Covers edge case; removing the _root and there is more than 1 node.
  if (parentNode === null) {
    if (this._root.left === null && this._root.right !== null) {
      this._root = this._root.right;
    } else if (this._root.left !== null && this._root.right === null) {
      this._root = this._root.left;
    } else {
      largestOnLeft = this._root.left;
      parentIsTheNodeToRemove = true;

      while (largestOnLeft.right !== null) {
        largestOnLeft = largestOnLeft.right;
        parentIsTheNodeToRemove = false;
      }

      if (parentIsTheNodeToRemove === true) {
        this._root.value = this._root.left.value;
        this._root.left = null;
      } else {
        largestOnLeftParent = this._getParent(largestOnLeft.value);
        this._root.value = largestOnLeft.value;

        if (largestOnLeft.left !== null) {
          largestOnLeftParent.right = largestOnLeft.left;
        } else {
          largestOnLeftParent.right = null;
        }
      }
    }
    this.count--;
    return true;
  }

  if (nodeToRemove.left === null && nodeToRemove.right === null) {
    if (nodeToRemove.value < parentNode.value) {
      parentNode.left = null;
    } else {
      parentNode.right = null;
    }
  } else if (nodeToRemove.left !== null && nodeToRemove.right === null) {
    if (nodeToRemove.value < parentNode.value) {
      parentNode.left = nodeToRemove.left;
    } else {
      parentNode.right = nodeToRemove.left;
    }
  } else if (nodeToRemove.left === null && nodeToRemove.right !== null) {
    if (nodeToRemove.value < parentNode.value) {
      parentNode.left = nodeToRemove.right;
    } else {
      parentNode.right = nodeToRemove.right;
    }
  } else {
    largestOnLeft = nodeToRemove.left;
    parentIsTheNodeToRemove = true;

    while (largestOnLeft.right !== null) {
      largestOnLeft = largestOnLeft.right;
      parentIsTheNodeToRemove = false;
    }

    if (parentIsTheNodeToRemove === true) {
      nodeToRemove.value = nodeToRemove.left.value;
      nodeToRemove.left = null;
    } else {
      largestOnLeftParent = this._getParent(largestOnLeft.value);
      nodeToRemove.value = largestOnLeft.value;

      if (largestOnLeft.left !== null) {
        largestOnLeftParent.right = largestOnLeft.left;
      } else {
        largestOnLeftParent.right = null;
      }
    }
  }
  this.count--;
  return true;
};

BinarySearchTree.prototype._preOrderTraversal = function (node, process) {
  if (node === null) {
    return;
  }
  process(node.value);
  this._preOrderTraversal(node.left, process);
  this._preOrderTraversal(node.right, process);
};

BinarySearchTree.prototype.preOrder = function (process) {
  if (typeof process !== 'function') {
    throw new Error('Must include processing function.');
  }
  this._preOrderTraversal(this._root, process);
};

BinarySearchTree.prototype._inOrderTraversal = function (node, process) {
  if (node === null) {
    return;
  }
  this._inOrderTraversal(node.left, process);
  process(node.value);
  this._inOrderTraversal(node.right, process);
};

BinarySearchTree.prototype.inOrder = function (process) {
  if (typeof process !== 'function') {
    throw new Error('Must include processing function.');
  }
  this._inOrderTraversal(this._root, process);
};

BinarySearchTree.prototype._postOrderTraversal = function (node, process) {
  if (node === null) {
    return;
  }
  this._postOrderTraversal(node.left, process);
  this._postOrderTraversal(node.right, process);
  process(node.value);
};

BinarySearchTree.prototype.postOrder = function (process) {
  if (typeof process !== 'function') {
    throw new Error('Must include processing function.');
  }
  this._postOrderTraversal(this._root, process);
};

BinarySearchTree.prototype._makeQueue = function () {
  var storage = {};
  var size = 0;
  var head = 0;

  return {
    enqueue: function (value) {
      storage[head + size] = value;
      size++;
    },
    dequeue: function () {
      var temp;

      if (size === 0) {
        return;
      }

      temp = storage[head];
      size--;
      head++;

      return temp;
    },
    size: function () {
      return size;
    }
  };
};

BinarySearchTree.prototype.breadthFirst = function (process) {
  var queue;
  var current;

  if (typeof process !== 'function') {
    throw new Error('Must include processing function.');
  }

  if (this._root === null) {
    return;
  }

  queue = this._makeQueue();
  queue.enqueue(this._root);

  while (queue.size() !== 0) {
    current = queue.dequeue();
    process(current.value);

    if (current.left !== null) {
      queue.enqueue(current.left);
    }
    if (current.right !== null) {
      queue.enqueue(current.right);
    }
  }
};

BinarySearchTree.prototype.max = function () {
  var max;

  if (this._root === null) {
    return;
  }

  max = this._root;

  while (max.right !== null) {
    max = max.right;
  }

  return max.value;
};

BinarySearchTree.prototype.min = function () {
  var min;

  if (this._root === null) {
    return;
  }

  min = this._root;

  while (min.left !== null) {
    min = min.left;
  }

  return min.value;
};

module.exports = BinarySearchTree;
