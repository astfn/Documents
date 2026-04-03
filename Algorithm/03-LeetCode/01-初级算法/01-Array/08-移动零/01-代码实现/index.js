//方案一
/*
    遍历数组，一旦遇到  `0` ，就将其放置到 Array 末尾。
    * 注意对特殊情况的处理：存在连续的`0`
*/
// export default function moveZeroes(nums) {
//   let counter = 0;
//   for (let i = 0; i < nums.length - counter; i++) {
//     if (nums[i] === 0) {
//       nums.push(...nums.splice(i, 1));
//       counter++;
//       i--;
//     }
//   }

//   return nums;
// }

//方案二
/*
 * 遍历 Array ，先将所有非 `0` 项移至到最前方，并记录操作的次数`counter`
 * 然后再让数组末尾长度为 `nums.length - counter` 的部分全部置为 `0` 即可。（这一步相当于把所有`0`移动到末尾）
 */
// export default function moveZeroes(nums) {
//   let counter = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       nums[counter] = nums[i];
//       counter++;
//     }
//   }

//   for (let i = nums.length - 1; i > counter - 1; i--) {
//     nums[i] = 0;
//   }
//   return nums;
// }

//方案三
//该方案比较巧妙，虽然也是将所有非零项依次放到最前面，但在放置的同时完成了数据的交换，将 0 放置到非零项的原位置
//到最后，所有非零项只在最前面，而 0 项自然放置到了最后

export default function moveZeroes(nums) {
  for (let i = 0, counter = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[counter];
      nums[counter] = nums[i];
      nums[i] = temp;
      counter++;
    }
  }
  return nums;
}
