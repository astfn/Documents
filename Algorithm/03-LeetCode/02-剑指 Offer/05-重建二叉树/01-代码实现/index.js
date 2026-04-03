function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

export default function buildTree(preorder, inorder) {
  function deep(preorder, l1, r1, inorder, l2, r2) {
    //递归终止条件
    if (l1 > r1 || l2 > r2) return null;

    //在inorder中定位root
    let i = l2;
    while (inorder[i] !== preorder[l1]) i++;

    //创建root
    let root = new TreeNode(preorder[l1]);

    root.left = deep(preorder, l1 + 1, l1 + i - l2, inorder, l2, i - 1);
    root.right = deep(preorder, l1 + i - l2 + 1, r1, inorder, i + 1, r2);

    return root;
  }

  return deep(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
}
