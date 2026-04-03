function Node(key) {
  this.key = key;
  this.left = null;
  this.right = null;
}

export default function BinarySearchTree() {
  this.root = null;

  /* 插入操作 */
  //对外暴露方法
  BinarySearchTree.prototype.insert = function (key) {
    const newNode = new Node(key);

    if (this.root === null) {
      this.root = newNode;
      return;
    }
    insertNode(this.root, newNode);
  };
  //内部使用，递归寻找合适位置
  var insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
        return;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
        return;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };

  /* 最大值 */
  BinarySearchTree.prototype.max = function () {
    let node = this.root;
    while (node.right) {
      node = node.right;
    }
    return node ? node.key : null;
  };
  /* 最小值 */
  BinarySearchTree.prototype.min = function () {
    let node = this.root;
    while (node.left) {
      node = node.left;
    }
    return node ? node.key : null;
  };

  /* 搜索特定的key */
  BinarySearchTree.prototype.findByKey = function (key) {
    let node = this.root;
    while (node) {
      if (key > node.key) {
        if (!node.right) return null;
        node = node.right;
      }
      if (key < node.key) {
        if (!node.left) return null;
        node = node.left;
      }
      if (key === node.key) return node;
    }
    return node;
  };

  /* 删除某元素 */
  //自己实现
  BinarySearchTree.prototype.delete = function (key) {
    if (this.root === null) return false;

    let parent = null;
    let current = this.root;
    let isPointLeft = true;

    while (current && current.key !== key) {
      parent = current;
      if (key < current.key) {
        isPointLeft = true;
        current = current.left;
      } else if (key > current.key) {
        isPointLeft = false;
        current = current.right;
      }
    }

    //没有找到目标节点
    if (current === null) return false;

    this.deleteNode(parent, current, isPointLeft);
  };
  BinarySearchTree.prototype.deleteNode = function (
    parent,
    current,
    isPointLeft
  ) {
    const { left, right } = current;

    //叶子节点
    if (!left && !right) {
      //且为根节点
      if (current === this.root) {
        this.root = null;
        return;
      }
      parent[isPointLeft ? "left" : "right"] = null;
    }

    //有一个子节点
    else if (!left) {
      //且为根节点
      if (current === this.root) {
        this.root[isPointLeft ? "left" : "right"] = current.right;
        return;
      }
      parent[isPointLeft ? "left" : "right"] = current.right;
    } else if (!right) {
      //且为根节点
      if (current === this.root) {
        this.root[isPointLeft ? "left" : "right"] = current.left;
        return;
      }
      parent[isPointLeft ? "left" : "right"] = current.left;
    }

    //有两个子节点
    else {
      let successorP = parent;
      let successor = current.right;
      while (successor.left) {
        successorP = successor;
        successor = successor.left;
      }

      //删除节点为根节点
      if (current === this.root) {
        this.root.key = successor.key;
        this.deleteNode(successorP, successor, true);
        return;
      }

      //右节点没有左子树
      if (successor === current.right) {
        parent[isPointLeft ? "left" : "right"].key = current.right.key;
        this.deleteNode(current, current.right, false);
        return;
      }

      parent[isPointLeft ? "left" : "right"].key = successor.key;
      this.deleteNode(successorP, successor, true);
    }
  };

  //方案二
  // BinarySearchTree.prototype.delete = function (key) {
  //   //定义一些变量，存储重要信息
  //   let parent = null;
  //   let current = this.root;
  //   let isPointLeft = false;

  //   while (current && current.key !== key) {
  //     parent = current;
  //     if (key > current.key) {
  //       isPointLeft = false;
  //       current = current.right;
  //     } else if (key < current.key) {
  //       isPointLeft = true;
  //       current = current.left;
  //     }
  //   }
  //   //最后没找到，或者为空树
  //   if (current === null) return false;

  //   const { left, right } = current;
  //   // 为叶子节点
  //   if (!left && !right) {
  //     if (parent === null) {
  //       //且为根节点
  //       this.root = null;
  //     } else {
  //       parent[isPointLeft ? "left" : "right"] = null;
  //     }
  //   }

  //   //有一个子节点
  //   else if (left === null) {
  //     if (parent === null) {
  //       //且为根节点
  //       this.root = current.right;
  //     } else {
  //       parent[isPointLeft ? "left" : "right"] = current.right;
  //     }
  //   }
  //   //
  //   else if (right === null) {
  //     if (parent === null) {
  //       //且为根节点
  //       this.root = current.left;
  //     } else {
  //       parent[isPointLeft ? "left" : "right"] = current.left;
  //     }
  //   }

  //   //有两个子节点
  //   else {
  //     const successor = this.getSuccessor(current);

  //     if (parent === null) {
  //       //且为根节点
  //       this.root = successor;
  //     } else {
  //       parent[isPointLeft ? "left" : "right"] = successor;
  //     }
  //     //更新左子树,更新右子树的操作，在getSuccessor中
  //     successor.left = current.left;
  //   }
  // };
  // //获取后继节点
  // BinarySearchTree.prototype.getSuccessor = function (delNode) {
  //   let parent = delNode;
  //   let current = delNode.right;

  //   while (current.left) {
  //     parent = current;
  //     current = current.left;
  //     console.log(current);
  //   }

  //   //这是最难理解的部分，实际上是合理删除后继节点
  //   if (current !== delNode.right) {
  //     parent.left = current.right;
  //     current.right = delNode.right;
  //   }

  //   return current;
  // };

  /* 树的常见遍历方式*/
  //先序遍历
  BinarySearchTree.prototype.preOrder = function () {
    const result = [];
    order(this.root);
    return result;

    function order(root) {
      if (root === null) return;
      result.push(root.key);
      order(root.left);
      order(root.right);
    }
  };
  //中序遍历
  BinarySearchTree.prototype.midOrder = function () {
    const result = [];
    order(this.root);
    return result;

    function order(root) {
      if (root === null) return;
      order(root.left);
      result.push(root.key);
      order(root.right);
    }
  };
  //后序遍历
  BinarySearchTree.prototype.postOrder = function () {
    const result = [];
    order(this.root);
    return result;

    function order(root) {
      if (root === null) return;
      order(root.left);
      order(root.right);
      result.push(root.key);
    }
  };

  //层序遍历
  BinarySearchTree.prototype.layerOrder = function () {
    const queue = [[this.root, 0]];
    const result = [];

    while (queue.length) {
      const [node, level] = queue.shift();
      if (!result[level]) {
        result.push([node.key]);
      } else {
        result[level].push(node.key);
      }

      node.left && queue.push([node.left, level + 1]);
      node.right && queue.push([node.right, level + 1]);
    }

    return result;
  };
}
