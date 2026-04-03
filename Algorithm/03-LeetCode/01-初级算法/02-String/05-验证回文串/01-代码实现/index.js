/* 方案一 */
// //现将数字、英文截取出来，并转化为小写
// //判断转化后的String反转后是否相等即可
// export default function isPalindrome(s) {
//   const reg = /[a-z]?[0-9]?/g;
//   s = s.toLowerCase();
//   const last = s.match(reg).join("");
//   return [...last].reverse().join("") === [...last].join("");
// }

/* 方案二 */
//双指针，从两端收缩遍历比较
// export default function isPalindrome(s) {
//   const reg = /[a-z]?[0-9]?/g;
//   s = s.toLowerCase();
//   const last = s.match(reg).join("");

//   let h = 0;
//   let f = last.length - 1;

//   while (h < f) {
//     if (last[h] !== last[f]) {
//       console.log(last[h], last[f]);
//       return false;
//     }
//     h++;
//     f--;
//   }
//   console.log(h, f);
//   return true;
// }

//也可使用一个for循环完成
export default function isPalindrome(s) {
  const reg = /[a-z]?[0-9]?/g;
  s = s.toLowerCase();
  const last = s.match(reg).join("");

  for (let i = 0; i <= last.length / 2; i++) {
    if (last[i] !== last[last.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
