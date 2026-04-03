## 题目

[原题](https://www.nowcoder.com/practice/4f470d1d3b734f8aaf2afb014185b395?tpId=188&&tqId=38588&rp=1&ru=/activity/oj&qru=/ta/job-code-high-week/question-ranking)

请实现有重复数字的升序数组的二分查找

给定一个 元素有序的（升序）长度为n的整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 **第一个出现的** target，如果目标值存在返回下标，否则返回 -1


示例 1:

```
输入：[1,2,4,4,5],4
返回值：2
说明：从左到右，查找到第1个为4的，下标为2，返回2    
```

示例 2:

```
输入：[1,2,4,4,5],3
返回值：-1
```

示例3

```
输入：[1,1,1,1,1],1
返回值：0
```



## 代码实现

该题目是 `普通二分查找` 的变形

* 数组升序，且有重复元素
* 找到 `target` **第一次出现的位置**

题解思路：

由于数组是有序的，在找到 target 后，我们只需要判断左侧是否有相同的元素即可。

* 当 `nums[mid]===target` 时，更新 `res` ，然后并不立即返回，区间继续向左收缩，直到找到第一次出现的位置。

```
function search( nums ,  target ) {
  let l = 0;
  let r = nums.length - 1;
  let mid = l + Math.floor((r - l) / 2);
  let res = -1;
  while (l <= r) {
    if (nums[mid] === target) {
      res = mid;
      r = mid - 1;
    } else if (nums[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
    mid = l + Math.floor((r - l) / 2);
  }
  return res;
}
```



