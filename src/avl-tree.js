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

module.exports = AVLTree;
