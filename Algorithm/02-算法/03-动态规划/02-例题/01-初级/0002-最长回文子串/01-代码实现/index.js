/* 暴力解决 */

// export default function longestPalindrome(s) {
//   let res = s[0];

//   for (let l = 0; l < s.length; l++) {
//     for (let r = s.length - 1; r > l; r--) {
//       let cs = s.slice(l, r + 1);
//       if (isPalindrome(cs)) {
//         res = res.length > cs.length ? res : cs;
//       }
//     }
//   }

//   return res;

//   function isPalindrome(s) {
//     for (let i = 0; i < Math.floor(s.length / 2); i++) {
//       if (s[i] !== s[s.length - i - 1]) return false;
//     }
//     return true;
//   }
// }

/* 动态规划  */

export default function longestPalindrome(s) {
  let res = s[0];
  //初始化dp
  let dp = Array.from({ length: s.length }).map((_) =>
    new Array(s.length).fill(false)
  );
  //遍历求解
  for (let start = s.length - 1; start >= 0; start--) {
    for (let end = start; end < s.length; end++) {
      //求解逻辑
      if (s[start] === s[end]) {
        if (end - start <= 1) {
          dp[start][end] = true;
        } else {
          dp[start][end] = dp[start + 1][end - 1];
        }
      } else {
        dp[start][end] = false;
      }
      //如果当前字串是回文，则保留最优解
      if (dp[start][end]) {
        res = res.length > end - start + 1 ? res : s.slice(start, end + 1);
      }
    }
  }
  return res;
}
