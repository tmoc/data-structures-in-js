var AVLTree = function () {
  this._root = null;
  this._count = 0;
};

AVLTree.prototype._getNode = function (node, value) {
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

AVLTree.prototype._getParentNode = function (node, value) {
  if (node === null) {
    return null;
  } else if (value < node.value) {
    if (value === node.left) {
      return node;
    } else {
      return this._getParentNode(node.left, value);
    }
  } else {
    if (value === node.right) {
      return node;
    } else {
      return this._getParentNode(node.right, value);
    }
  }
};

AVLTree.prototype._getParent = function (value) {
  return this._getParentNode(this._root);
};

AVLTree.prototype.contains = function (value) {
  if (this._getNode(this._root, value) === null) {
    return false;
  }
  return true;
};

AVLTree.prototype._makeNode = function (value) {
  return {value: value, height: 0, left: null, right: null};
};

AVLTree.prototype._rightRotation = function (node) {
  var oldLeft = node.left;
  node.left = oldLeft.right;
  oldLeft.right = node;
  node.height = this._maxHeight(node.left, node.right) + 1;
  oldLeft.height = this._maxHeight(oldLeft.left, oldLeft.right) + 1;
};

AVLTree.prototype._leftRotation = function (node) {
  var oldRight = node.right;
  node.right = oldRight.left;
  oldRight.left = node;
  node.height = this._maxHeight(node.left, node.right) + 1;
  oldRight.height = this._maxHeight(oldRight.left, oldRight.right) + 1;
};

AVLTree.prototype._rightAndLeftRotation = function (node) {
  this._rightRotation(node.right);
  this._leftRotation(node);
};

AVLTree.prototype._leftAndRightRotation = function (node) {
  this._leftRotation(node.left);
  this._rightRotation(node);
};

AVLTree.prototype._balanceFactor = function (leftNode, rightNode) {
  var leftNodeHeight = leftNode !== null ? leftNode.height : -1;
  var rightNodeHeight = rightNode !== null ? rightNode.height : -1;
  return leftNodeHeight - rightNodeHeight;
};

AVLTree.prototype._maxHeight = function (leftNode, rightNode) {
  var leftNodeHeight = leftNode !== null ? leftNode.height : -1;
  var rightNodeHeight = rightNode !== null ? rightNode.height : -1;
  return Math.max(leftNodeHeight, rightNodeHeight);
};

AVLTree.prototype._checkBalance = function (node) {
  if (this._balanceFactor(node.left, node.right) === 2) { // Left too high.
    if (this._balanceFactor(node.left.left, node.left.right) > 0) {
      this._rightRotation(node);
    } else {
      this._leftAndRightRotation(node);
    }
  } else if (this._balanceFactor(node.left, node.right) === -2) { // Right too high.
    if (this._balanceFactor(node.right.left, node.right.right) < 0) {
      this._leftRotation(node);
    } else {
      this._rightAndLeftRotation(node);
    }
  } else {
    node.height = this._maxHeight(node.left, node.right) + 1;
  }
};

AVLTree.prototype._addNode = function (node, value) {
  if (value < node.value) {
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
  this._checkBalance(node);
};

AVLTree.prototype.insert = function (value) {
  if (this._root === null) {
    this._root = this._makeNode(value);
  } else {
    this._addNode(this._root, value);
  }
  this._count++;
};

AVLTree.prototype.size = function () {
  return this._count;
};

AVLTree.prototype.height = function () {
  if (this._root === null) {
    return -1;
  } else {
    return this._root.height;
  }
};

AVLTree.prototype.remove = function (value) {
  var pathStack = []; // Store all nodes visited for rebalancing.
  var nodeToRemove = this._root;
  var parentNode;
  var largestOnLeft;
  var largestOnLeftParent;
  var parentOfLargestOnLeftIsNodeToRemove;

  while (nodeToRemove !== null && value !== nodeToRemove.value) {
    pathStack.push(nodeToRemove);
    if (value < nodeToRemove.value) {
      nodeToRemove = nodeToRemove.left;
    } else {
      nodeToRemove = nodeToRemove.right;
    }
  }

  if (nodeToRemove === null) {
    return false;
  }

  if (this._count === 1) {
    this._root = null;
    this._count = 0;
    return;
  }

  parentNode = this._getParent(value);

  // Removing the root with multiple nodes in the tree.
  if (parentNode === null) {
    if (this._root.left !== null && this._root.right === null) {
      this._root = this._root.left;
    } else if (this._root.left === null && this._root.right !== null) {
      this._root = this._root.right;
    } else {
      largestOnLeft = this._root.left;
      parentOfLargestOnLeftIsNodeToRemove = true;

      while (largestOnLeft.right !== null) {
        largestOnLeft = largestOnLeft.right;
        parentOfLargestOnLeftIsNodeToRemove = false;
      }

      if (parentOfLargestOnLeftIsNodeToRemove === false) {
        largestOnLeftParent = this._getParent(largestOnLeft.value);
        this._root.value = largestOnLeft.value;
        largestOnLeftParent.right = null;
      } else {
        this._root.value = this._root.left.value;
        this._root.left = null;
      }
    }
  } else {
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
    } else if (this._root.left === null && this._root.right !== null) {
      if (nodeToRemove.value < parentNode.value) {
        parentNode.left = nodeToRemove.right;
      } else {
        parentNode.right = nodeToRemove.right;
      }
    } else {
      largestOnLeft = nodeToRemove.left;
      parentOfLargestOnLeftIsNodeToRemove = true;

      while (largestOnLeft.right !== null) {
        largestOnLeft = largestOnLeft.right;
        parentOfLargestOnLeftIsNodeToRemove = false;
      }

      if (parentOfLargestOnLeftIsNodeToRemove === false) {
        largestOnLeftParent = this._getParent(largestOnLeft.value);
        nodeToRemove.value = largestOnLeft.value;
        largestOnLeftParent.right = null;
      } else {
        nodeToRemove.value = nodeToRemove.left.value;
        nodeToRemove.left = null;
      }
    }
  }

  // Rebalance tree.
  while (pathStack.length !== 0) {
    this._checkBalance(pathStack.pop());
  }
  this._count--;
};

AVLTree.prototype._preOrderTraversal = function (node, process) {
  if (node !== null) {
    process(node.value);
    this._preOrderTraversal(node.left, process);
    this._preOrderTraversal(node.right, process);
  }
};

AVLTree.prototype.preOrder = function (process) {
  if (typeof process !== 'function') {
    throw new Error('Must provide processing function.');
  }
  this._preOrderTraversal(this._root, process);
};

AVLTree.prototype._inOrderTraversal = function (node, process) {
  if (node !== null) {
    this._inOrderTraversal(node.left, process);
    process(node.value);
    this._inOrderTraversal(node.right, process);
  }
};

AVLTree.prototype.inOrder = function (process) {
  if (typeof process !== 'function') {
    throw new Error('Must provide processing function.');
  }
  this._inOrderTraversal(this._root, process);
};

AVLTree.prototype._postOrderTraversal = function (node, process) {
  if (node !== null) {
    this._postOrderTraversal(node.left, process);
    this._postOrderTraversal(node.right, process);
    process(node.value);
  }
};

AVLTree.prototype.postOrder = function (process) {
  if (typeof process !== 'function') {
    throw new Error('Must provide processing function.');
  }
  this._postOrderTraversal(this._root, process);
};

AVLTree.prototype._makeQueue = function () {
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
      head++;
      size--;
      return temp;
    },
    length: function () {
      return size;
    }
  };
};

AVLTree.prototype.breadthFirst = function (process) {
  var queue = this._makeQueue();
  var current;

  if (this._root === null) {
    return;
  }

  queue.enqueue(this._root);

  while (queue.length() !== 0) {
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

AVLTree.prototype.max = function () {
  var current;

  if (this._root === null) {
    return null;
  }

  current = this._root;

  while (current.right !== null) {
    current = current.right;
  }

  return current.value;
};

AVLTree.prototype.min = function () {
  var current;

  if (this._root === null) {
    return null;
  }

  current = this._root;

  while (current.left !== null) {
    current = current.left;
  }

  return current.value;
};


module.exports = AVLTree;
