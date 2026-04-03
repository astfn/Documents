/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/* 方案一 */
// //自后向前 node.next = preNode
// export default function reverseList(head) {
//   if (head === null) {
//     return head;
//   }
//   let newHead;
//   const length = getLength(head);
//   for (let i = length - 1; i >= 0; i--) {
//     let current = getNodeByIndex(i);
//     let prevNode = getPrevNode(current);
//     current.next = prevNode;
//     if (i === length - 1) {
//       newHead = current;
//     }
//   }
//   head = newHead;
//   return head;

//   function getLength(head) {
//     let current = head;
//     let length = 0;
//     while (current) {
//       length++;
//       current = current.next;
//     }
//     return length;
//   }
//   function getNodeByIndex(index) {
//     let counter = 0;
//     let current = head;
//     while (counter < index) {
//       current = current.next;
//       counter++;
//     }
//     return current;
//   }
//   function getPrevNode(node) {
//     let current = head;
//     let prevNode = head;
//     while (current !== node) {
//       prevNode = current;
//       current = current.next;
//     }
//     return current === head ? null : prevNode;
//   }
// }

/* 优化方案一 */
// //既然是自后向前进行连接，我们完全可使用栈的特性完成。代码性能要比最初方案好很多，时间复杂度为O(n)
// export default function reverseList(head) {
//   if (head === null) {
//     return head;
//   }

//   let stack = [];
//   let current = head;
//   while (current) {
//     stack.push(current);
//     current = current.next;
//   }

//   let newHead = stack[stack.length - 1];
//   let node = stack.pop();
//   while (stack.length > 0) {
//     let preNode = stack.pop();
//     preNode = preNode === undefined ? null : preNode;
//     node.next = preNode;
//     node = preNode;
//   }

//   node.next = null;
//   head = newHead;

//   return head;
// }

/* 方案二 */
//双指针解决
//不断从链表中取出新的节点，并让这个新节点作为新链表的head
//newHead 指针不断指向新的头部节点，nextNode保存即将指向的下一个节点(之前取出的节点)
export default function reverseList(head) {
  if (head === null) {
    return head;
  }

  let current = head;
  let newHead = null;
  let nextNode = null;
  while (current) {
    let nextTemp = current.next;

    current.next = nextNode;
    nextNode = current;

    newHead = current;
    current = nextTemp;
  }
  head = newHead;
  return head;
}
