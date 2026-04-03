// //双指针+map
// export default function lengthOfLongestSubstring(s) {
//   if (s.length <= 1) return s.length;

//   let info = {};
//   info[s[0]] = true;
//   let base = 0,
//     res = 0,
//     max = 1,
//     j = 1;
//   while (j < s.length) {
//     if (info[s[j]]) {
//       j = ++base;
//       info = {};
//       res = max > res ? max : res;
//       max = 1;
//     } else {
//       max++;
//     }
//     info[s[j]] = true;
//     j++;
//   }
//   res = max > res ? max : res;
//   return res || s.length;
// }

//滑动窗口
export default function lengthOfLongestSubstring(s) {
  if (s.length <= 1) return s.length;

  let info = [];
  let max = 0;
  let fast = 0;

  while (fast < s.length) {
    if (info.includes(s[fast])) {
      let shift = null;
      while (shift !== s[fast]) {
        shift = info.shift();
      }
    }
    info.push(s[fast]);
    fast++;
    max = Math.max(max, info.length);
  }
  return max;
}
