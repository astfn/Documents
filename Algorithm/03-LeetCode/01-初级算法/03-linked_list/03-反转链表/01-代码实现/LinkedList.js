// LinkedList 类
export default function LinkedList() {
  //头部指针
  this.head = null;
  //记录长度
  this.length = 0;
}
//各个节点类
function Node(data) {
  this.data = data;
  this.next = null;
}
/*
  增
*/
LinkedList.prototype.append = function (ele) {
  let newNode = new Node(ele);
  if (!this.head) {
    this.head = newNode;
  } else {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  this.length++;
  return this.size();
};
LinkedList.prototype.insert = function (position, ele) {
  if (position < 0 || position > this.length) {
    return false;
  }
  let newNode = new Node(ele);

  if (position === 0) {
    newNode.next = this.head;
    this.head = newNode;
  } else {
    let index = 0;
    let current = this.head;
    let previous = null;
    while (index++ < position) {
      previous = current;
      current = current.next;
    }
    newNode.next = previous.next;
    previous.next = newNode;
  }
  this.length++;
  return this.size();
};
/*
  删
*/

LinkedList.prototype.removeAt = function (position) {
  if (position < 0 || position >= this.length) {
    return false;
  }
  let current = this.head;
  let previous = null;
  let next = null;
  let index = 0;

  while (index < position) {
    previous = current;
    current = current.next;
    next = current.next;
    index++;
  }
  if (index === 0) {
    if (this.length === 1) {
      this.head = null;
    } else {
      next = this.head.next;
      this.head.next = null;
      this.head = next;
    }
  } else {
    current.next = null;
    previous.next = next;
  }
  this.length--;
  return current.data;
};
//借助其它方法实现remove
LinkedList.prototype.remove = function (ele) {
  let index = this.indexOf(ele);
  return index === -1 ? false : this.removeAt(index);
};
/*
  改
*/
LinkedList.prototype.update = function (position, newEle) {
  if (position < 0 || position >= this.length) {
    return false;
  }
  let current = this.head;
  let index = 0;
  while (index++ < position) {
    current = current.next;
  }
  current.data = newEle;
  return true;
};
/*
  查
*/
LinkedList.prototype.get = function (position) {
  if (position < 0 || position >= this.length) {
    return null;
  }
  let current = this.head;
  let index = 0;
  while (index++ < position) {
    current = current.next;
  }
  return current.data;
};
LinkedList.prototype.indexOf = function (ele) {
  let current = this.head;
  let index = 0;
  while (current && current.data !== ele) {
    current = current.next;
    index++;
  }
  if (!current) {
    return -1;
  } else {
    return index;
  }
};
/*
  其它
*/
LinkedList.prototype.size = function () {
  return this.length;
};
LinkedList.prototype.isEmpty = function () {
  return this.length === 0;
};
LinkedList.prototype.toString = function () {
  let current = this.head;
  let result = "";
  while (current) {
    result += current.next ? `${current.data} ` : `${current.data}`;
    current = current.next;
  }
  return result;
};
