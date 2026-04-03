//方案一
//递归判断当前节点的左右子节点是否符合条件
//注意判断节点的取值区间
// export default function isValidBST(root) {
//   if (!root) return true;

//   if (
//     (root.left && root.key <= root.left.key) ||
//     (root.right && root.key >= root.right.key)
//   )
//     return false;

//   return isValidBST(root.left) && isValidBST(root.right);
// }
export default function isValidBST(root) {
  return deep(root, Infinity, -Infinity);

  function deep(root, max, min) {
    if (!root) return true;
    if (root.key <= min || root.key >= max) return false;

    return deep(root.left, root.key, min) && deep(root.right, max, root.key);
  }
}

//方案二
//中序遍历，`BST`中序遍历得到结果为有序。
// export default function isValidBST(root) {
//   let arr = [];
//   midDeep(root);

//   function midDeep(root) {
//     root.left && midDeep(root.left);
//     arr.push(root.key);
//     root.right && midDeep(root.right);
//   }

//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] >= arr[i + 1]) return false;
//   }

//   return true;
// }
