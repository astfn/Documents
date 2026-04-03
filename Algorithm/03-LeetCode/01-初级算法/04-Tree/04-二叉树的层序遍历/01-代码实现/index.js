export default function levelOrder(root) {
  if (!root) return [];

  let queue = [[root, 0]];
  let result = [];

  while (queue.length) {
    const [node, level] = queue.pop();
    if (result[level]) {
      result[level].push(node.key);
    } else {
      result[level] = [node.key];
    }

    node.left && queue.unshift([node.left, level + 1]);
    node.right && queue.unshift([node.right, level + 1]);
  }

  return result;
}
