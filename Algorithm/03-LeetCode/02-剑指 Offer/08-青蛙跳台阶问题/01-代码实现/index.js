//从第 n-1 阶，到第 n 阶，只有唯一的一种跳法
//我们只需要求得：到达前 n-1 阶与前 n-2 阶的跳法总合即可。
/*
   你可能会有疑问：既然从第 n-1 阶，到第 n 阶，只有唯一的一种跳法，为什么不直接求得前 n-1 阶方法总和再+1？
   因为第 n-1 阶，到第 n 阶，间隔 1 阶，只有一种跳法。
   但在之前的步骤中，可能跳 1 阶，也可能跳 2 阶.
   前 n-1 阶与前 n-2 阶，分别代表奇偶数阶层。
*/
export default function numWays(n) {
  let sums = [1, 1];
  for (let i = 2; i <= n; i++) {
    sums[i] = (sums[i - 1] + sums[i - 2]) % 1000000007;
  }
  return sums[n];
}

// //优化内存，但效率不如第一个
// export default function numWays(n) {
//   if (n <= 1) return 1;

//   let before1 = 1;
//   let before2 = 1;
//   let res = 2;

//   for (let i = 2; i <= n; i++) {
//     res = (before1 + before2) % 1000000007;
//     before1 = before2;
//     before2 = res;
//   }
//   return res;
// }
