
var BinarySearchTree = function () {
  this.count = 0;
  this.root = null;
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
  if (this.count < 2 || this.root === null || this.root.value === value) {
    return null;
  } else {
    return this._getParentNode(this.root, value);
  }
};

BinarySearchTree.prototype.contains = function (value) {
  if (this._getNode(this.root, value) === null) {
    return false;
  } else {
    return true;
  }
};

BinarySearchTree.prototype.insert = function (value) {
  if (this.root === null) {
    this.root = this._makeNode(value);
  } else {
    this._addNode(this.root, value);
  }
  this.count++;
};

BinarySearchTree.prototype.remove = function (value) {
  var nodeToRemove = this._getNode(this.root, value);
  var parentNode;
  var largestOnLeft;
  var largestOnLeftParent;
  var parentIsTheNodeToRemove;

  if (nodeToRemove === null) {
    return false;
  }

  if (this.count === 1) {
    this.root = null;
    this.count = 0;
    return true;
  }

  parentNode = this._getParent(value);

  // Covers edge case; removing the root and there is more than 1 node.
  if (parentNode === null) {
    if (this.root.left === null && this.root.right !== null) {
      this.root = this.root.right;
    } else if (this.root.left !== null && this.root.right === null) {
      this.root = this.root.left;
    } else {
      largestOnLeft = this.root.left;
      parentIsTheNodeToRemove = true;

      while (largestOnLeft.right !== null) {
        largestOnLeft = largestOnLeft.right;
        parentIsTheNodeToRemove = false;
      }

      if (parentIsTheNodeToRemove === true) {
        this.root.value = this.root.left.value;
        this.root.left = null;
      } else {
        largestOnLeftParent = this._getParent(largestOnLeft.value);
        this.root.value = largestOnLeft.value;

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

module.exports = BinarySearchTree;
