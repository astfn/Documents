/* 方案一 */
//排序后进行比较
// export default function isAnagram(s, t) {
//   if (s.length !== t.length) return false;

//   let newS = [...s].sort();
//   let newT = [...t].sort();

//   for (let i = 0; i < newS.length; i++) if (newS[i] !== newT[i]) return false;

//   return true;
// }

/* 方案二 */
//存储每个字符出现的次数
// export default function isAnagram(s, t) {
//   if (s.length !== t.length) return false;

//   let sInfo = {};
//   let tInfo = {};

//   for (let i = 0; i < s.length; i++)
//     sInfo[s[i]] = sInfo[s[i]] === undefined ? 1 : sInfo[s[i]] + 1;

//   for (let i = 0; i < t.length; i++)
//     tInfo[t[i]] = tInfo[t[i]] === undefined ? 1 : tInfo[t[i]] + 1;

//   for (const [key, val] of Object.entries(sInfo)) {
//     if (val !== tInfo[key]) return false;
//   }
//   return true;
// }

/* 方案二优化 */
//只需要一个变量进行存储
//* 先遍历 s ，存储字符的出现次数
//* 再遍历 t ，遇到对应的字符，将次数-1
//最后判断每个字符的最后数值是否为 0 。
export default function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  let Info = {};

  for (let i = 0; i < s.length; i++)
    Info[s[i]] = Info[s[i]] === undefined ? 1 : Info[s[i]] + 1;

  for (let i = 0; i < t.length; i++) {
    if (!Info[t[i]]) return false;
    Info[t[i]] -= 1;
  }

  return Object.keys(Info).every((key) => Info[key] === 0);
}
