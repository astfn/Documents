function Stack() {
  this.value = [];
}
//入栈
Stack.prototype.push = function (...args) {
  for (let i = 0; i < args.length; i++) {
    let last = this.value.length;
    this.value[last] = args[i];
  }
};
//出栈
Stack.prototype.pop = function () {
  let last = this.value[this.value.length - 1];
  this.value.length--;
  return last;
};
//返回栈头数据
Stack.prototype.peek = function () {
  let last = this.value.length - 1;
  return this.value[last];
};
//是否为空
Stack.prototype.isEmpty = function () {
  return this.value.length === 0;
};
//长度
Stack.prototype.size = function () {
  return this.value.length;
};
//转为字符串
Stack.prototype.toString = function () {
  let result = "";
  for (let i = 0; i < this.value.length; i++) {
    result += this.value[i] + (i == this.value.length - 1 ? "" : " ");
  }
  return result;
};

// let stack = new Stack();
// console.log(stack);
// stack.push("Ashun", "Ashuntefannao");
// console.log(stack);
// stack.pop();
// console.log(stack);
// console.log(stack.peek());
// console.log(stack.isEmpty());
// stack.push("AshuntefannaoA");
// console.log(stack.toString());

export default Stack;
