// /* 方案一：沿着中心 `x` 轴，将二维表上下进行反转。再对角线替换 */
// //注意点：对角线替换时：
// //* 若直接双重for循环遍历每一个元素进行操作,则会造成元素的重复替换，导致最后与替换前结果一致。比如便利第一行元素[0,1]，此时要与[1,0]进行替换，反之遍历到[1,0]，则又会与[0,1]进行替换，回到初始状态。
// //* 你可能会想到，为了防止对称元素重复替换，只遍历行数的一半不就行了？
// //  * 但此时，虽然后半部分不会重复替换，但所遍历的前一半依旧会有重复项，如果矩阵为6x6，则[0,1]/[1,0];[1,1]/[1,1];[0,2]/[2,0];[1,2]/[2,1];[2,2]/[2,2]都会重复替换。

// //* 可以发现，上述问题就是[i][j]与[j][i]的重复替换。
// //* 第 i 行替换完毕后，后续的 i+1 行 就会有 i+1 个元素会进行重复的替换，所以我们不遍历前 i + 1 个元素即可。

// export default function rotate(matrix) {
//   //首位行替换
//   for (let i = 0; i < matrix.length / 2; i++) {
//     const temp = matrix[i];
//     matrix[i] = matrix[matrix.length - 1 - i];
//     matrix[matrix.length - 1 - i] = temp;
//   }

//   //对角线替换
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = i + 1; j < matrix.length; j++) {
//       const temp = matrix[i][j];
//       matrix[i][j] = matrix[j][i];
//       matrix[j][i] = temp;
//     }
//   }

//   return matrix;
// }

/* 方案二 */
// * 对角线替换
// * 每一行进行反序排列
export default function rotate(matrix) {
  //对角线替换
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix.length; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  matrix.forEach((v) => (v = v.reverse()));
  return matrix;
}
