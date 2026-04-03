//方案一：使用 set
// export default function singleNumber(nums) {
//   let set = new Set();
//   for (let i = 0; i < nums.length; i++) {
//     if (set.has(nums[i])) {
//       set.delete(nums[i]);
//     } else {
//       set.add(nums[i]);
//     }
//   }
//   return [...set][0];
// }

//方案二：思路相同，使用数组（性能不如set）
// export default function singleNumber(nums) {
//   let result = [];
//   for (let i = 0; i < nums.length; i++) {
//     if (result.indexOf(nums[i]) !== -1) {
//       result.splice(result.indexOf(nums[i]), 1);
//     } else {
//       result.push(nums[i]);
//     }
//   }
//   return result[0];
// }

//方案三：使用异或
export default function singleNumber(nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) result ^= nums[i];
  return result;
}
//去掉额外引用
// export default function singleNumber(nums) {
//   return nums.reduce((pre, val) => {
//     return pre ^ val;
//   });
// }
