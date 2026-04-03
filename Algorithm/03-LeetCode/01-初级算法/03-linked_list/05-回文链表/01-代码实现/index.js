/* 方案一 */
//* 遍历链表，将各个元素依次 `push` 进数组
//* 首尾对称依次取出数组中的各个元素，进行比较
// export default function isPalindrome(head) {
//   let toArray = [];
//   while (head) {
//     toArray.push(head.data);
//     head = head.next;
//   }
//   for (let i = 0; i < toArray.length / 2; i++) {
//     if (toArray[i] !== toArray[toArray.length - 1 - i]) return false;
//   }
//   return true;
// }
// //leetcode版
// export default function isPalindrome(head) {
//   let toArray = [];
//   while (head) {
//     toArray.push(head.val);
//     head = head.next;
//   }
//   for (let i = 0; i < toArray.length / 2; i++) {
//     if (toArray[i] !== toArray[toArray.length - 1 - i]) return false;
//   }
//   return true;
// }

/* 方案二 */
//* 利用快慢指针找到链表终点（fast每次移动两步，slow每次移动一步，当fast到结尾时slow移动至链表的中心）
//* 将后半部分进行反转
//* fast指向头部，之后fast与slow每次都向后移动一步，依次比较即可
export default function isPalindrome(head) {
  let fast = head;
  let slow = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }

  if (fast) {
    slow = slow.next;
  }

  slow = reverse(slow);
  fast = head;

  while (slow != null) {
    if (fast.data !== slow.data) return false;
    fast = fast.next;
    slow = slow.next;
  }
  return true;

  function reverse(head) {
    let prevEjectNode = null;
    while (head !== null) {
      let nextTemp = head.next;
      head.next = prevEjectNode;
      prevEjectNode = head;
      head = nextTemp;
    }
    console.log(prevEjectNode);
    return prevEjectNode;
  }
}
