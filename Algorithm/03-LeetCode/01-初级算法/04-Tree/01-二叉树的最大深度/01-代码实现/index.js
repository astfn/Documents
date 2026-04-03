//方案一
// //层序遍历
// export default function maxDepth(root) {
//   if (!root) return 0;

//   const queue = [[root, 0]];
//   const result = [];

//   while (queue.length) {
//     const [node, level] = queue.shift();
//     if (!result[level]) {
//       result[level] = true;
//     }
//     node.left && queue.push([node.left, level + 1]);
//     node.right && queue.push([node.right, level + 1]);
//   }

//   return result.length;
// }

//方案二
//递归
export default function maxDepth(root) {
  return root ? Math.max(maxDepth(root.left), maxDepth(root.right)) + 1 : 0;
}
