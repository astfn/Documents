/* 方案一 */
//分别遍历两个Array，若遇到相同的选项，将其push进result后，再将该元素剔除，最后对比两个结果Array，返回长度较小的那个
// export default function intersect(nums1, nums2) {
//   let newNums1 = [...nums1];
//   let newNums2 = [...nums2];
//   let result1 = [];
//   let result2 = [];

//   for (let i = 0; i < nums1.length; i++) {
//     let current = nums1[i];
//     let findIndex = newNums2.indexOf(current);
//     if (findIndex !== -1) {
//       result1.push(current);
//       newNums2.splice(findIndex, 1);
//     }
//   }

//   for (let i = 0; i < nums2.length; i++) {
//     let current = nums2[i];
//     let findIndex = newNums1.indexOf(current);
//     if (findIndex !== -1) {
//       result2.push(current);
//       newNums1.splice(findIndex, 1);
//     }
//   }

//   console.log(result1, result2);
//   return result1.length > result2.length ? result2 : result1;
// }

/* 方案二 */
//1. ⭐先将数组进行排序
//2. 使用两个指针，分别指向两个数组
//通过两个指针实现两个数组的遍历，在遍历过程中,找到相同项,push进result
/*
  * 将两个指针所指向的元素进行比较，如果相同：
  * push 进 result 
  * 两个指针同时后移

* 若不同，则需要将 **指向较小值** 的指针向后移动
  因为数组已经排序，如果 `nums1[p1] < nums2[p2]`，此时如果将 `p2`(较大项)指针向后移，
  则 `p2` 会变的更大，在后续的比较中 `nums1[p1]` 就始终小于 `nums2[p2]`，就会导致 `p1`  指针的停滞。
*/
export default function intersect(nums1, nums2) {
  let p1 = 0;
  let p2 = 0;
  nums1 = nums1.sort((a, b) => a - b);
  nums2 = nums2.sort((a, b) => a - b);
  const res = [];

  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] < nums2[p2]) {
      p1++;
    } else if (nums1[p1] > nums2[p2]) {
      p2++;
    } else {
      res.push(nums1[p1]);
      p1++;
      p2++;
    }
  }
  return res;
}
