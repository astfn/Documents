/* 方案一 */
//对称交换即可
export default function reverseString(s) {
  for (let i = 0; i < s.length / 2; i++) {
    const temp = s[i];
    s[i] = s[s.length - i - 1];
    s[s.length - i - 1] = temp;
  }
  return s;
}

/* 方案二 */
//双指针
// export default function reverseString(s) {
//   let h = 0;
//   let f = s.length - 1;
//   while (h <= f) {
//     const temp = s[h];
//     s[h] = s[f];
//     s[f] = temp;
//     h++;
//     f--;
//   }
//   return s;
// }
