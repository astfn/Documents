/* 方案一： */
// export default function findNumberIn2DArray(matrix, target) {
//   if (matrix.length === 0) return false;

//   let rowSum = matrix.length;
//   let colSum = matrix[0].length;

//   //找出target可能存在的row
//   let rows = [];
//   for (let i = 0; i < rowSum; i++) {
//     if (matrix[i][0] <= target && target <= matrix[i][colSum - 1]) {
//       rows.push(i);
//     }
//   }
//   if (rows.length === 0) return false;

//   //对可能存在的row，进行二分查找。
//   //这里注意：如果某一行不存在target，就会导致死循环，所以这里使用对象记录mid，如果mid重复出现，则break
//   for (let i = 0; i < rows.length; i++) {
//     let row = rows[i];
//     console.log(row);
//     let start = 0;
//     let end = colSum - 1;
//     let mid = start + Math.floor((end - start) / 2);
//     let midInfo = {};
//     while (start < end) {
//       if (matrix[row][mid] > target) {
//         end = mid;
//       } else if (matrix[row][mid] < target) {
//         start = mid + 1;
//       } else {
//         start = mid;
//         break;
//       }
//       mid = start + Math.floor((end - start) / 2);

//       if (midInfo[mid]) {
//         break;
//       } else {
//         midInfo[mid] = true;
//       }
//     }
//     if (matrix[row][start] === target) return true;
//   }
//   return false;
// }

/*  方案二 */
//从矩阵的**右上角**出发进行判断，利用矩阵分别沿 x、y 轴递增的特点，进行高效的查找。

export default function findNumberIn2DArray(matrix, target) {
  if (matrix.length === 0) return false;

  let x = matrix[0].length - 1;
  let y = 0;

  let first = matrix[y][x]; //矩阵可能只有一个元素

  while (x >= 0 && y <= matrix.length - 1) {
    if (matrix[y][x] > target) {
      x--;
    } else if (matrix[y][x] < target) {
      y++;
    } else {
      return true;
    }
  }

  return first === target ? true : false;
}

/*  方案三 */
//简单粗暴

// export default function findNumberIn2DArray(matrix, target) {
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       if (matrix[i][j] === target) return true;
//     }
//   }
//   return false;
// }

/*  方案四 */
//奇技淫巧

// export default function findNumberIn2DArray(matrix, target) {
//   return matrix.some((line) => line.find((col) => col === target));
// }
