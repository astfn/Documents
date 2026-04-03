/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/* 方案一 */
//获取长度
//结合长度与 n 找到删除项的前驱节点，进行删除即可
export default function removeNthFromEnd(head, n) {
  let current = head;

  //获取长度
  let length = 0;
  while (current) {
    length++;
    current = current.next;
  }

  //删除项为第一个元素
  if (length - n === 0) {
    head = head.next;
    return head;
  }

  //删除项为后续元素
  //获取preNode
  current = head;
  let counter = 0;
  while (counter < length - n - 1) {
    current = current ? current.next : null;
    counter++;
  }

  current.next = current.next.next;

  return head;
}

/* 方案二 */
// //双指针
// //先让 fast 走 n 步 ，如果 current 不存在 ，代表删除的是 head
// //根据 fast 移动 slow ，找到删除项的前驱节点
// export default function removeNthFromEnd(head, n) {
//   let fast = head;
//   let slow = head;

//   for (let i = 0; i < n; i++) fast = fast.next;

//   if (!fast) {
//     head = head.next;
//     return head;
//   }

//   while (fast.next) {
//     fast = fast.next;
//     slow = slow.next;
//   }

//   slow.next = slow.next.next;
//   return head;
// }
