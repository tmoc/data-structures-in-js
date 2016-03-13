var LinkedList = require('../src/singly-linked-list-pseudoclassical');
var expect = require('chai').expect;

describe('singly-linked-list-pseudoclassical', function () {
  it('Should insert values at end.', function () {
    var linkedList = new LinkedList();
    linkedList.insertAtEnd(42);
    expect(linkedList.getSize()).to.equal(1);
    expect(linkedList.contains(42)).to.equal(true);
  });

  it('Should insert values at beginning.', function () {
    var linkedList = new LinkedList();
    linkedList.insertAtBeginning(42);
    expect(linkedList.getSize()).to.equal(1);
    expect(linkedList.contains(42)).to.equal(true);
  });

  it('Should remove nothing from end when size is 0.', function () {
    var linkedList = new LinkedList();
    expect(linkedList.getSize()).to.equal(0);
    expect(linkedList.removeFromEnd()).to.equal(undefined);
    expect(linkedList.getSize()).to.equal(0);
  });

  it('Should remove values from end when size is 1.', function () {
    var linkedList = new LinkedList();
    linkedList.insertAtEnd('a');
    expect(linkedList.getSize()).to.equal(1);
    expect(linkedList.removeFromEnd()).to.equal('a');
    expect(linkedList.getSize()).to.equal(0);
  });

  it('Should remove values from end when size is 2.', function () {
    var linkedList = new LinkedList();
    linkedList.insertAtEnd(42);
    linkedList.insertAtEnd('a');
    expect(linkedList.getSize()).to.equal(2);
    expect(linkedList.contains('a')).to.equal(true);
    expect(linkedList.removeFromEnd()).to.equal('a');
    expect(linkedList.getSize()).to.equal(1);
    expect(linkedList.contains('a')).to.equal(false);
  });

  it('Should remove values from end when size is > 2.', function () {
    var linkedList = new LinkedList();
    linkedList.insertAtEnd(42);
    linkedList.insertAtEnd('a');
    linkedList.insertAtEnd('b');
    expect(linkedList.getSize()).to.equal(3);
    expect(linkedList.contains('b')).to.equal(true);
    expect(linkedList.removeFromEnd()).to.equal('b');
    expect(linkedList.getSize()).to.equal(2);
    expect(linkedList.contains('b')).to.equal(false);
    expect(linkedList.contains('a')).to.equal(true);
  });

  it('Should remove nothing from beginning when size is 0.', function () {
    var linkedList = new LinkedList();
    expect(linkedList.getSize()).to.equal(0);
    expect(linkedList.removeFromBeginning()).to.equal(undefined);
    expect(linkedList.getSize()).to.equal(0);
  });

  it('Should remove values from beginning when size is 1.', function () {
    var linkedList = new LinkedList();
    linkedList.insertAtEnd('a');
    expect(linkedList.getSize()).to.equal(1);
    expect(linkedList.removeFromBeginning()).to.equal('a');
    expect(linkedList.getSize()).to.equal(0);
  });

  it('Should remove values from beginning when size is > 1.', function () {
    var linkedList = new LinkedList();
    linkedList.insertAtEnd(42);
    linkedList.insertAtEnd('a');
    linkedList.insertAtEnd('b');
    expect(linkedList.getSize()).to.equal(3);
    expect(linkedList.contains(42)).to.equal(true);
    expect(linkedList.removeFromBeginning()).to.equal(42);
    expect(linkedList.getSize()).to.equal(2);
    expect(linkedList.contains(42)).to.equal(false);
    expect(linkedList.contains('a')).to.equal(true);
  });
});
