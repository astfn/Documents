function Node(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

let n7 = new Node(3);
let n6 = new Node(null);
let n5 = new Node(3);
let n4 = new Node(null);
let n3 = new Node(2, null, n7);
let n2 = new Node(2, null, n5);
let n1 = new Node(1, n2, n3);

// console.log(n1);
console.log(isSymmetric(n1));

/* 方案一 */
// //层序遍历,判断每一层是否对称
// function isSymmetric(root) {
//   let queue = [[root, 0]];
//   let arr = [];

//   while (queue.length) {
//     const [node, level] = queue.pop();
//     let val = node ? node.val : "null";
//     if (arr[level]) {
//       arr[level].push(val);
//     } else {
//       arr[level] = [val];
//     }
//     if (val === "null") continue;

//     queue.unshift([node.left, level + 1]);
//     queue.unshift([node.right, level + 1]);
//   }

//   console.log(arr);
//   for (let level = 0; level < arr.length; level++) {
//     const currentLength = arr[level].length;
//     for (let j = 0; j < currentLength / 2; j++) {
//       if (arr[level][j] !== arr[level][currentLength - j - 1]) return false;
//     }
//   }

//   return true;
// }

//递归思想，非递归代码
//每次判断currentNode的左右子节点是否对称
//* 没有左右子节点（对称）
//* 只存在一个子节点（不对称）
//* 存在两个子节点，但二者值不同（不对称）
function isSymmetric(root) {
  if (!root) return true;

  let queue = [[root.left, root.right]];
  while (queue.length) {
    const [left, right] = queue.pop();
    if (!left && !right) continue;
    if (!left || !right || left.val !== right.val) return false;
    queue.unshift([left.left, right.right]);
    queue.unshift([left.right, right.left]);
  }

  return true;
}
