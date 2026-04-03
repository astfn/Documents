// //只求了满足的node，但要注意的是，这些node必须是相邻的。
// export default function movingCount(m, n, k) {
//   let counter = 0;
//   for (let y = 0; y < m; y++) {
//     for (let x = 0; x < n; x++) {
//       test(y, x) && counter++;
//     }
//   }
//   return counter;

//   function test(y, x) {
//     let sum = 0;
//     sum = digitSum(sum, y) + digitSum(sum, x);
//     return sum <= k;
//   }

//   function digitSum(sum, num) {
//     while (num >= 1) {
//       let add = 0;
//       if (num > 10) {
//         add = num % (Math.floor(num / 10) * 10);
//       } else if (num < 10) {
//         add = num;
//       }

//       sum += add;
//       num = Math.floor(num / 10);
//     }

//     return sum;
//   }
// }

//
export default function movingCount(m, n, k) {
  //初始化boolean矩阵，记录走过的路径
  let visited = [];
  for (let row = 0; row < m; row++)
    for (let col = 0; col < n; col++) {
      if (visited[row]) {
        visited[row][col] = false;
      } else {
        visited[row] = [false];
      }
    }

  return dfs(0, 0, visited);

  //递归寻找符合条件的节点
  function dfs(y, x, visited) {
    if (y < 0 || x < 0 || x >= n || y >= m || !test(y, x) || visited[y][x])
      return 0;

    visited[y][x] = true; //标记已访问节点

    return (
      dfs(y + 1, x, visited) +
      dfs(y - 1, x, visited) +
      dfs(y, x - 1, visited) +
      dfs(y, x + 1, visited) +
      1
    );
  }

  //验证该节点是否满足条件
  function test(y, x) {
    let sum = 0;
    sum = digitSum(sum, y) + digitSum(sum, x);
    return sum <= k;
  }

  //计算位数之和
  function digitSum(sum, num) {
    while (num >= 1) {
      let add = 0;
      if (num > 10) {
        add = num % (Math.floor(num / 10) * 10);
      } else if (num < 10) {
        add = num;
      }

      sum += add;
      num = Math.floor(num / 10);
    }

    return sum;
  }
}
