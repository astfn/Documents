export default function merge(nums1, m, nums2, n) {
  let p1 = 0;
  let p2 = 0;

  while (p1 < m + p2 && p2 < n) {
    if (nums2[p2] <= nums1[p1]) {
      for (let i = m + p2; i > p1; i--) {
        nums1[i] = nums1[i - 1];
      }
      nums1[p1] = nums2[p2];
      p2++;
    }
    p1++;
  }
  while (p2 < n) {
    nums1[m + p2] = nums2[p2];
    p2++;
  }
  return nums1;
}
