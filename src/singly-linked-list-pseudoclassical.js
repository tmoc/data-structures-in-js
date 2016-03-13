var LinkedList = function () {
  this.head = null;
  this.tail = null;
  this.size = 0;
};

LinkedList.prototype.getSize = function () {
  return this.size;
};

LinkedList.prototype.insertAtEnd = function (value) {
  var newTail = {value: value, next: null};
  if (!this.tail) {
    this.tail = newTail;
    this.head = newTail;
  } else {
    this.tail.next = newTail;
    this.tail = newTail;
  }
  this.size++;
};

LinkedList.prototype.insertAtBeginning = function (value) {
  var newHead = {value: value, next: null};
  if (!this.head) {
    this.head = newHead;
    this.tail = newHead;
  } else {
    newHead.next = this.head;
    this.head = newHead;
  }
  this.size++;
};

LinkedList.prototype.removeFromEnd = function () {
  var temp;
  var checkNode = function (node) {
    var temp;
    if (node.next && node.next.next === null) {
      temp = node.next.value;
      node.next = null;
      this.tail = node;
      return temp;
    } else {
      return checkNode(node.next);
    }
  };

  if (this.size === 1) {
    temp = this.tail.value;
    this.tail = null;
    this.head = null;
  } else if (this.size === 2) {
    temp = this.tail.value;
    this.head.next = null;
    this.tail = this.head;
  } else if (this.size > 2) {
    temp = checkNode(this.head);
  }
  if (this.size > 0) {
    this.size--;
  }
  return temp;
};

LinkedList.prototype.removeFromBeginning = function () {
  var temp;

  if (this.size === 1) {
    temp = this.head.value;
    this.tail = null;
    this.head = null;
  } else if (this.size > 1) {
    temp = this.head.value;
    this.head = this.head.next;
  }
  if (this.size > 0) {
    this.size--;
  }
  return temp;
};

LinkedList.prototype.contains = function (value) {
  var checkNode = function (node) {
    if (node.value === value) {
      return true;
    }
    if (!node.next) {
      return false;
    }
    return checkNode(node.next);
  };

  return checkNode(this.head);
};

module.exports = LinkedList;
