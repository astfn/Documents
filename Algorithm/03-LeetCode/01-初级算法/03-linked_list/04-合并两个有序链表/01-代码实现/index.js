/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 **/
//leetcode中，表头直接传入表即可，例如list1.head,在力扣中直接list1即可
import LinkedList from "./LinkedList.js";

/* 基于自己封装LinkedList实现，方便测试 */
//由于两个链表都是升序，所以，我们只需要依次遍历两个链表
//每次找出较小的一个item，放入新的链表中即可。
export default function mergeTwoLists(list1, list2) {
  if (!list1 && !list2) return null;
  if (!list1 || !list2) return list1 === null ? list2 : list1;

  let p1 = list1.head;
  let p2 = list2.head;

  let dummy = new LinkedList();
  dummy.head = {};
  let curr = dummy.head;

  while (p1 !== null && p2 !== null) {
    if (p1.data <= p2.data) {
      curr.next = p1;
      p1 = p1.next;
    } else {
      console.log(p1.data, p2.data);
      curr.next = p2;
      p2 = p2.next;
    }
    curr = curr.next;
  }
  curr.next = p1 === null ? p2 : p1;
  return dummy.head.next;
}

//力扣提交版本
// export default function mergeTwoLists(list1, list2) {
//   if (!list1 && !list2) return null;
//   if (!list1 || !list2) return list1 === null ? list2 : list1;

//   let p1 = list1;
//   let p2 = list2;

//   let dummy = new ListNode();
//   let curr = dummy;
//   while (p1 !== null && p2 !== null) {
//     if (p1.val <= p2.val) {
//       curr.next = p1;
//       p1 = p1.next;
//     } else {
//       curr.next = p2;
//       p2 = p2.next;
//     }
//     curr = curr.next;
//   }
//   curr.next = p1 === null ? p2 : p1;
//   return dummy.next;
// }
