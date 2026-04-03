/* 方案一 */
// //快慢指针：如果链表存在环，则快慢指针必定会在某一时刻重合。
// export default function hasCycle(head) {
//   let fast = head;
//   let slow = head;

//   while (fast && fast.next) {
//     fast = fast.next.next;
//     slow = slow.next;
//     if (fast === slow) return true;
//   }
//   return false;
// }

/* 方案二 */
//遍历链表，存入集合，如果元素重复，则代表有环
export default function hasCycle(head) {
  let node = head;
  let set = new Set();

  while (node) {
    if (set.has(node)) return true;
    set.add(node);
    node = node.next;
  }
  return false;
}
