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
    expect(bst.count).to.equal(4);
  });
});
