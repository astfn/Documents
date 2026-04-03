## 题目

[原题](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/xn2925/)

​	给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

示例 1：

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

示例 2：

```
输入：head = [1], n = 1
输出：[]
```

示例 3：

```
输入：head = [1,2], n = 1
输出：[1]
```


提示：

* 链表中结点的数目为 sz
* 1 <= sz <= 30
* 0 <= Node.val <= 100
* 1 <= n <= sz

进阶：

* 你能尝试使用一趟扫描实现吗？

## 代码实现

无论哪种方案，都要考虑的特殊情况：删除项为 `head`

### 方案一

* 获取长度
* 结合长度与 n 找到删除项的前驱节点，进行删除即可

```
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
```

### 方案二

利用双指针

* 先让 fast 走 n 步 ，如果 current 不存在 ，代表删除的是 head
* 根据 fast 移动 slow ，找到删除项的前驱节点，进行删除操作即可。

```
export default function removeNthFromEnd(head, n) {
  let fast = head;
  let slow = head;

  for (let i = 0; i < n; i++) fast = fast.next;

  if (!fast) {
    head = head.next;
    return head;
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return head;
}
```

