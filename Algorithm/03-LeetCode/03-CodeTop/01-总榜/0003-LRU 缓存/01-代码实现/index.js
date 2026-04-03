/*  方案一*/
// 数组模拟链表
// 由于在get后，需要将目标节点放到头部，此时就需要查找目标节点。
// 如果使用数组，查找目标节点的时间复杂度为O(n)，就会超时。
// 并且题中说明，要求各方法时间复杂度为O(1)。
// 之所以使用数组模拟链表，本人想测试一下findIndex是否符合要求。

// /**
//  * @param {number} capacity
//  */
// var LRUCache = function (capacity) {
//   this.limit = capacity;
//   this.cache = [];
//   this.maps = {};
// };

// /**
//  * @param {number} key
//  * @return {number}
//  */
// LRUCache.prototype.get = function (key) {
//   let item = this.maps[key];
//   if (item) {
//     let findIndex = this.cache.findIndex((v) => v.key === item.key);
//     this.cache.unshift(...this.cache.splice(findIndex, 1));
//   }

//   return item ? item.value : -1;
// };

// /**
//  * @param {number} key
//  * @param {number} value
//  * @return {void}
//  */
// LRUCache.prototype.put = function (key, value) {
//   if (this.maps[key]) {
//     this.maps[key].value = value;
//     this.get(key);
//   } else {
//     if (this.cache.length >= this.limit) {
//       //删除旧数据
//       let { key } = this.cache.pop();
//       delete this.maps[key];
//     }
//     //添加新数据
//     let item = { key, value };
//     this.maps[key] = item;
//     this.cache.unshift(item);
//   }
// };

// /**
//  * Your LRUCache object will be instantiated and called as such:
//  * var obj = new LRUCache(capacity)
//  * var param_1 = obj.get(key)
//  * obj.put(key,value)
//  */
// export default LRUCache;

/* 方案二 */
//手动封装双向链表

//节点类
function Node(data) {
  this.data = data;
  this.prev = null;
  this.next = null;
}
//双向链表
function BiLinkList() {
  this.head = null;
  this.foot = null;
  this.length = 0;
}
//头部添加数据
BiLinkList.prototype.unshift = function (node) {
  if (this.length === 0) {
    this.head = this.foot = node;
  } else {
    let oldHead = this.head;
    node.next = oldHead;
    oldHead.prev = node;
    this.head = node;
    node.prev = null;
  }
  this.length++;
};
//将某节点放置在头部
BiLinkList.prototype.toHead = function (node) {
  if (this.length === 1) return;
  this.delete(node);
  this.unshift(node);
};
//删除某节点
BiLinkList.prototype.delete = function (node) {
  if (this.length === 1) {
    this.head = this.foot = null;
    this.length = 0;
    return node;
  }
  if (node === this.head) {
    let nextNode = node.next;
    nextNode.prev = null;
    this.head = nextNode;
  } else if (node === this.foot) {
    let prevNode = node.prev;
    prevNode.next = null;
    node.prev = null;
    this.foot = prevNode;
  } else {
    let prevNode = node.prev;
    let nextNode = node.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  this.length--;
  return node;
};

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.limit = capacity;
  this.cache = new BiLinkList();
  this.maps = {};
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let node = this.maps[key];
  if (node) {
    this.cache.toHead(node);
  }

  return node ? node.data.value : -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node;
  if (this.maps[key]) {
    //存在，则更新value，并toHead
    node = this.maps[key];
    node.data.value = value;
    this.cache.toHead(node);
  } else {
    node = new Node({ key, value });
    if (this.cache.length >= this.limit) {
      //删除旧数据
      let foot = this.cache.delete(this.cache.foot);
      delete this.maps[foot.data.key];
    }
    //添加新数据
    this.maps[key] = node;
    this.cache.unshift(node);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

export default LRUCache;
