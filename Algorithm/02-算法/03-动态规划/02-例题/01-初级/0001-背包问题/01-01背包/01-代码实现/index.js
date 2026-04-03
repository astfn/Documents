/*01背包-动态规划解决
   动态规划五部曲

    1. 设计好dp，理解含义
    2. 找到递推公式
    3. 初始化dp（为了让dp完全符合递推公式）
    4. 确定遍历顺序（保证每次求解时所用到的依赖项已被计算）
    5. 打印dp，debug
*/

// export default function WeightBagProblem(weight, value, size) {
//   let goodsLen = weight.length;
//   //初始化dp
//   let dp = Array.from({ length: goodsLen }).map((_) =>
//     new Array(size + 1).fill(0)
//   );

//   for (let bagWeight = 1; bagWeight < size + 1; bagWeight++) {
//     dp[0][bagWeight] = weight[0] <= bagWeight ? value[0] : 0;
//   }
//   //计算部分
//   for (let goods = 1; goods < goodsLen; goods++) {
//     for (let bagWeight = 1; bagWeight < size + 1; bagWeight++) {
//       if (weight[goods] <= bagWeight) {
//         dp[goods][bagWeight] = Math.max(
//           dp[goods - 1][bagWeight],
//           dp[goods - 1][bagWeight - weight[goods]] + value[goods]
//         );
//       } else {
//         dp[goods][bagWeight] = dp[goods - 1][bagWeight];
//       }
//     }
//   }

//   return dp[goodsLen - 1][size];
// }

export default function WeightBagProblem(weight, value, size) {
  let dp = new Array(size + 1).fill(0);

  //滚动数组：
  //必须先遍历 goods，再遍历 bag
  //遍历 bag 时，必须是倒叙遍历，否则会导致一些商品的重复放入
  for (let goods = 0; goods < weight.length; goods++) {
    for (let bagWeight = size; bagWeight >= 1; bagWeight--) {
      if (weight[goods] <= bagWeight) {
        dp[bagWeight] = Math.max(
          dp[bagWeight],
          dp[bagWeight - weight[goods]] + value[goods]
        );
      }
    }
  }
  return dp[size];
}
