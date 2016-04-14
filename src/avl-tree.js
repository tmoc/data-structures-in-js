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

AVLTree.prototype.contains = function (value) {
  if (this._getNode(this._root, value) === null) {
    return false;
  }
  return true;
};

AVLTree.prototype._makeNode = function (value) {
  return {value: value, height: 0, left: null, right: null};
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

AVLTree.prototype.checkBalance = function (node) {
  if (this._balanceFactor(node.left, node.right) === 2) { // Left too high.
    if (this._balanceFactor(node.left.left, node.left.right) > 0) {
      // Right rotation.
    } else {
      // Left and right rotation.
    }

  } else if (this._balanceFactor(node.left, node.right) === -2) { // Right too high.
    if (this._balanceFactor(node.right.left, node.right.right) < 0) {
      // Left rotation.
    } else {
      // Right and left rotation.
    }
  } else {
    node.height = this._maxHeight(node.left, node.right) + 1;
  }
};

AVLTree.prototype._addNode = function (node, value) {

};

AVLTree.prototype.insert = function (value) {

};
