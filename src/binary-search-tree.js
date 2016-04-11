
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

module.exports = BinarySearchTree;
