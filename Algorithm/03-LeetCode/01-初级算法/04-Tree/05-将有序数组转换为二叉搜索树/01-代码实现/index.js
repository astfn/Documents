function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

// //错误思想，没有尽力趋于满二叉树
// export default function sortedArrayToBST(nums) {
//   const len = nums.length;
//   if (len === 1) return new TreeNode(nums[0], null, null); //长度为 1

//   for (let i = 0; i < nums.length; i++) {
//     nums[i] = new TreeNode(nums[i], null, null);
//   }

//   let mid = Math.floor(len / 2);
//   const root = nums[mid];

//   //正常状况处理
//   let left = mid - 1;
//   let current = root;

//   while (left >= 0) {
//     current.left = nums[left--];
//     current = current.left;
//   }

//   let right = mid + 1;
//   current = root;

//   while (right <= len - 1) {
//     current.right = nums[right++];
//     current = current.right;
//   }
//   return root;
// }

//递归解决
export default function sortedArrayToBST(nums) {
  if (nums.length === 1) return new TreeNode(nums[0], null, null); //长度为 1

  for (let i = 0; i < nums.length; i++) {
    nums[i] = new TreeNode(nums[i], null, null);
  }

  return deep(0, nums.length - 1);

  function deep(low, high) {
    if (low > high) return null;
    console.log(low, high);
    let len = high - low;
    let mid = low + Math.floor(len / 2);
    const root = nums[mid];

    root.left = deep(low, mid - 1);
    root.right = deep(mid + 1, high);

    return root;
  }
}

// export default function sortedArrayToBST(nums) {
//   if (nums.length === 0) return null;
//   return deep(nums, 0, nums.length - 1);
// }
// function deep(nums, start, end) {
//   if (start > end) return null;
//   let len = end - start;
//   let mid = start + Math.floor(len / 2);
//   let root = new TreeNode(nums[mid]);

//   root.left = deep(nums, start, mid - 1);
//   root.right = deep(nums, mid + 1, end);

//   return root;
// }
