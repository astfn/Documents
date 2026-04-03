export default function removeDuplication(nums) {
  let left = 0;
  for (let right = 1; right < nums.length; right++) {
    if (nums[left] !== nums[right]) nums[++left] = nums[right];
  }
  nums.length = left + 1;
  return nums;
}

// export default function removeDuplication(nums) {
//   let left = 0;
//   let right = 1;

//   while (right < nums.length) {
//     if (nums[left] === nums[right]) {
//       right++;
//     } else {
//       nums[++left] = nums[right];
//     }
//   }
//   nums.length = left + 1;
//   return nums.length;
// }

/* 普通数组去重 */
// //方法一：需要新的数组引用
// export default function removeDuplication(nums) {
//   let result = [];

//   for (let i = 0; i < nums.length; i++) {
//     if (result.findIndex((v) => v === nums[i]) === -1) {
//       result.push(nums[i]);
//     }
//   }
//   return result;
// }

//方法二：利用冒泡，将各个元素进行对比，如果相同，则删除
// //注意点：splice操作的是原数组，删除一个元素，后面的元素会顶替上来，此时j不应该继续++，所以++后，再次--进行了回退。
// export default function removeDuplication(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] === nums[j]) {
//         nums.splice(j, 1);
//         j--;
//       }
//     }
//   }
//   return nums;
// }
