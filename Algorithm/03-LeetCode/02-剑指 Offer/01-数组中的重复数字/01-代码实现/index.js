/* 方案一： */
//最普通的方法，双重`for`循环进行比较，遇到重复项直接` return`

// export default function findRepeatNumber(nums) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] === nums[j]) return nums[i];
//     }
//   }
// }

/* 方案二： */
//用对象存储已遍历的元素是否存在
//* 该方式效率较高

export default function findRepeatNumber(nums) {
  let info = {};
  for (let i = 0; i < nums.length; i++) {
    if (info[nums[i]]) {
      return nums[i];
    } else {
      info[nums[i]] = true;
    }
  }
}

/* 奇技淫巧 */

// export default function findRepeatNumber(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     if (nums.indexOf(nums[i]) !== nums.lastIndexOf(nums[i])) return nums[i];
//   }
// }
