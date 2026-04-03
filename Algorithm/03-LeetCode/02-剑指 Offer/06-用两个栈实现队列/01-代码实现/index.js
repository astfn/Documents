export default function CQueue() {
  this.stack1 = []; //构造队列前半部分
  this.stack2 = []; //构造队列后半部分
}

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack2.push(value);
  return null;
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  //队空，返回-1
  if (this.stack1.length === 0 && this.stack2.length === 0) return -1;
  //前半部分不为空，直接从前半部分弹出元素
  if (this.stack1.length) {
    return this.stack1.pop();
  }
  //stack1为空，将stack2中的数据，反序压入stack1，再从stake1弹出，保证队列先进先出的特点。
  if (this.stack1.length === 0) {
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop());
    }
    return this.stack1.pop();
  }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
