/* 方案一 */
// //双指针遍历
// export default function merge(nums1, m, nums2, n) {
//   let p1 = 0;
//   let p2 = 0;

//   while (p1 < m + p2 && p2 < n) {
//     if (nums2[p2] <= nums1[p1]) {
//       for (let i = m + p2; i > p1; i--) {
//         nums1[i] = nums1[i - 1];
//       }
//       nums1[p1] = nums2[p2];
//       p2++;
//     }
//     p1++;
//   }
//   while (p2 < n) {
//     nums1[m + p2] = nums2[p2];
//     p2++;
//   }
//   return nums1;
// }

/* 方案二 */
//依旧是双指针，但性能很高，满足时间复杂度 `O(m + n)` 。
//自后向前依次插入当前最大值。
export default function merge(nums1, m, nums2, n) {
  let last1 = m - 1;
  let last2 = n - 1;
  let insertP = m + n - 1;

  while (last1 >= 0 || last2 >= 0) {
    if (last1 < 0 || nums2[last2] > nums1[last1]) {
      nums1[insertP--] = nums2[last2--];
    } else {
      nums1[insertP--] = nums1[last1--];
    }
  }
  return nums1;
}
