// //方案一：将后面的部分截取，再在头部入栈
// export default function rotate(nums, k) {
//   //旋转一圈后，与原数组无异，所以当k >= length 时，就不断 -length ，去掉无用的部分
//   while (k >= nums.length) k -= nums.length;
//   nums.unshift(...nums.splice(nums.length - k, nums.length));
//   return nums;
// }

// //方案二：方案一的具体化，只是用基本的push、unshift方法
export default function rotate(nums, k) {
  while (k >= nums.length) k -= nums.length;
  for (let i = 0; i < k; i++) nums.unshift(nums.pop());
  return nums;
}
