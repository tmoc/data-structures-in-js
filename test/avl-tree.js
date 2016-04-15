var AVLTree = require('../src/avl-tree');
var expect = require('chai').expect;

describe('avl-tree', function () {
  it('Should insert values.', function () {
    var avlTree = new AVLTree();

    avlTree.insert(2);
    avlTree.insert(1);
    avlTree.insert(3);
    avlTree.insert(900);

    expect(avlTree.contains(2)).to.equal(true);
    expect(avlTree.contains(1)).to.equal(true);
    expect(avlTree.contains(3)).to.equal(true);
    expect(avlTree.contains(900)).to.equal(true);
    expect(avlTree.size()).to.equal(4);
    expect(avlTree.height()).to.equal(2);
  });

  it('Should remove values.', function () {
    var avlTree = new AVLTree();

    avlTree.insert(2);
    avlTree.insert(1);
    avlTree.insert(3);
    avlTree.insert(900);

    expect(avlTree.size()).to.equal(4);
    expect(avlTree.contains(2)).to.equal(true);
    avlTree.remove(2);
    expect(avlTree.contains(2)).to.equal(false);

    expect(avlTree.size()).to.equal(3);
    expect(avlTree.contains(1)).to.equal(true);
    avlTree.remove(1);
    expect(avlTree.contains(1)).to.equal(false);

    expect(avlTree.size()).to.equal(2);
    expect(avlTree.contains(3)).to.equal(true);
    avlTree.remove(3);
    expect(avlTree.contains(3)).to.equal(false);

    expect(avlTree.size()).to.equal(1);
    expect(avlTree.contains(900)).to.equal(true);
    avlTree.remove(900);
    expect(avlTree.contains(900)).to.equal(false);

    expect(avlTree.size()).to.equal(0);
  });

  it('Should perform pre-order traversal.', function () {
    var avlTree = new AVLTree();
    var order = [];

    avlTree.insert(2);
    avlTree.insert(1);
    avlTree.insert(3);

    avlTree.preOrder(function (value) {
      order.push(value);
    });

    expect(order[0]).to.equal(2);
    expect(order[1]).to.equal(1);
    expect(order[2]).to.equal(3);
  });

  it('Should perform in-order traversal.', function () {
    var avlTree = new AVLTree();
    var order = [];

    avlTree.insert(2);
    avlTree.insert(1);
    avlTree.insert(3);

    avlTree.inOrder(function (value) {
      order.push(value);
    });

    expect(order[0]).to.equal(1);
    expect(order[1]).to.equal(2);
    expect(order[2]).to.equal(3);
  });

  it('Should perform post-order traversal.', function () {
    var avlTree = new AVLTree();
    var order = [];

    avlTree.insert(2);
    avlTree.insert(1);
    avlTree.insert(3);

    avlTree.postOrder(function (value) {
      order.push(value);
    });

    expect(order[0]).to.equal(1);
    expect(order[1]).to.equal(3);
    expect(order[2]).to.equal(2);
  });

  it('Should perform breadth-first traversal.', function () {
    var avlTree = new AVLTree();
    var order = [];

    avlTree.insert(2);
    avlTree.insert(1);
    avlTree.insert(3);
    avlTree.insert(0);
    avlTree.insert(4);

    avlTree.breadthFirst(function (value) {
      order.push(value);
    });

    expect(order[0]).to.equal(2);
    expect(order[1]).to.equal(1);
    expect(order[2]).to.equal(3);
    expect(order[3]).to.equal(0);
    expect(order[4]).to.equal(4);
  });

  it('Should return the largest value.', function () {
    var avlTree = new AVLTree();
    avlTree.insert(2);
    avlTree.insert(1);
    avlTree.insert(3);
    avlTree.insert(0);
    avlTree.insert(4);
    expect(avlTree.max()).to.equal(4);
  });

  it('Should return the smallest value.', function () {
    var avlTree = new AVLTree();
    avlTree.insert(2);
    avlTree.insert(1);
    avlTree.insert(3);
    avlTree.insert(0);
    avlTree.insert(4);
    expect(avlTree.min()).to.equal(0);
  });
});
