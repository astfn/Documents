/* 方案一 */
//转化为集合去重后，与原数组进行比较，看看是否保持完全一致
export default function containsDuplicate(nums) {
  const set = [...new Set(nums)];
  //return !nums.every((v, index) => v === set[index]);
  return nums.length !== set.length;
}

/* 方案二 */
//手动去重，与原数组进行比较，看看是否保持完全一致
// export default function containsDuplicate(nums) {
//   let set = [...nums];
//   for (let i = 0; i < set.length; i++) {
//     for (let j = i + 1; j < set.length; j++) {
//       if (set[i] === set[j]) {
//         set.splice(j, 1);
//         j--;
//       }
//     }
//   }
//   return nums.length !== set.length;
// }

////方案二优化
// export default function containsDuplicate(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] === nums[j]) {
//         return true;
//       }
//     }
//   }
//   return false;
// }
