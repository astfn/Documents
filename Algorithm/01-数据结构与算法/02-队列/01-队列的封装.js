/*
    实现队列有两种方式：
    1. 基于Array
    2. 基于链表

    虽然基于Array，在实现上比较简单，但是如果涉及到数据的操作,性能不是很好，需要频繁的操作数据
    例如：
      * 在头部增加数据：先length++，然后数据依次后移，再让新增数据赋值给头部
      * 删除头部数据： 数据依次往前移动，进行覆盖，然后length--
    但是基于数组，在查找数据时比较方便，直接通过索引进行查找

    同理，链表虽然在操作数据时性能比较高，但在查找数据时性能不如Array
    后面我们学习链表以后，可以尝试使用链表实现Queue

*/
function Queue() {
  this.value = [];
}
//入队
Queue.prototype.enqueue = function (val) {
  let length = this.value.length;
  this.value[length] = val;
  return this.value.length;
};
//出队
Queue.prototype.dequeue = function () {
  let result = this.value[0];
  for (let i = 0; i < this.value.length; i++) {
    this.value[i] = this.value[i + 1];
  }
  this.value.length--;
  return result;
};
//对头数据
Queue.prototype.front = function () {
  return this.value[0];
};
// 队长度
Queue.prototype.size = function () {
  return this.value.length;
};
// 是否为空
Queue.prototype.isEmpty = function () {
  return this.value.length === 0;
};
// 转为字符串
Queue.prototype.toString = function () {
  let result = "";
  for (let i = 0; i < this.value.length; i++) {
    result += i == this.size() - 1 ? this.value[i] : `${this.value[i]} `;
  }
  return result;
};

// let que = new Queue();
// que.enqueue("tefannao");
// que.enqueue("Ashun");
// console.log(que.dequeue());
// console.log(que.toString());

export default Queue;
