var BinarySearchTree = require('../src/binary-search-tree');
var expect = require('chai').expect;

describe('binary-search-tree', function () {
  it('Should insert values.', function () {
    var bst = new BinarySearchTree();

    bst.insert(2);
    bst.insert(1);
    bst.insert(3);
    bst.insert(900);

    expect(bst.contains(2)).to.equal(true);
    expect(bst.contains(1)).to.equal(true);
    expect(bst.contains(3)).to.equal(true);
    expect(bst.contains(900)).to.equal(true);
    expect(bst.size()).to.equal(4);
  });

  it('Should remove values.', function () {
    var bst = new BinarySearchTree();

    bst.insert(2);
    bst.insert(1);
    bst.insert(3);
    bst.insert(900);

    bst.remove(2);
    bst.remove(1);
    bst.remove(3);
    bst.remove(900);

    expect(bst.size()).to.equal(0);
    expect(bst.contains(2)).to.equal(false);
    expect(bst.contains(1)).to.equal(false);
    expect(bst.contains(3)).to.equal(false);
    expect(bst.contains(900)).to.equal(false);
  });

  it('Should perform pre-order traversal.', function () {
    var bst = new BinarySearchTree();
    var order = [];

    bst.insert(2);
    bst.insert(1);
    bst.insert(3);

    bst.preOrder(function (value) {
      order.push(value);
    });

    expect(order[0]).to.equal(2);
    expect(order[1]).to.equal(1);
    expect(order[2]).to.equal(3);
  });

  it('Should perform in-order traversal.', function () {
    var bst = new BinarySearchTree();
    var order = [];

    bst.insert(2);
    bst.insert(1);
    bst.insert(3);

    bst.inOrder(function (value) {
      order.push(value);
    });

    expect(order[0]).to.equal(1);
    expect(order[1]).to.equal(2);
    expect(order[2]).to.equal(3);
  });

  it('Should perform post-order traversal.', function () {
    var bst = new BinarySearchTree();
    var order = [];

    bst.insert(2);
    bst.insert(1);
    bst.insert(3);

    bst.postOrder(function (value) {
      order.push(value);
    });

    expect(order[0]).to.equal(1);
    expect(order[1]).to.equal(3);
    expect(order[2]).to.equal(2);
  });

  it('Should perform breadth-first traversal.', function () {
    var bst = new BinarySearchTree();
    var order = [];

    bst.insert(2);
    bst.insert(1);
    bst.insert(3);
    bst.insert(0);
    bst.insert(4);

    bst.breadthFirst(function (value) {
      order.push(value);
    });

    expect(order[0]).to.equal(2);
    expect(order[1]).to.equal(1);
    expect(order[2]).to.equal(3);
    expect(order[3]).to.equal(0);
    expect(order[4]).to.equal(4);
  });

  it('Should return the largest value.', function () {
    var bst = new BinarySearchTree();
    bst.insert(2);
    bst.insert(1);
    bst.insert(3);
    bst.insert(0);
    bst.insert(4);
    expect(bst.max()).to.equal(4);
  });

  it('Should return the smallest value.', function () {
    var bst = new BinarySearchTree();
    bst.insert(2);
    bst.insert(1);
    bst.insert(3);
    bst.insert(0);
    bst.insert(4);
    expect(bst.min()).to.equal(0);
  });
});
