/* 方案一： */
// //反转链表后输出
// export default function reversePrint(head) {
//   let result = [];

//   let current = head;
//   let preNode = null;
//   while (current) {
//     let nextNode = current.next;
//     current.next = preNode;
//     head = current;
//     preNode = current;
//     current = nextNode;
//   }

//   current = head;
//   while (current) {
//     result.push(current.val);
//     current = current.next;
//   }

//   return result;
// }

/* 方案二： */
//遍历链表，存储在**栈**Array中
export default function reversePrint(head) {
  let result = [];
  while (head) {
    result.unshift(head.val);
    head = head.next;
  }
  return result;
}
