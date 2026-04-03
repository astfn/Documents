/* 方案一： */
// //利用正则表达式
// export default function replaceSpace(s) {
//   return s.replace(/\s/g, "%20");
// }

/* 方案二： */
// //遍历string，将每一个元素push进入Array，如果当前元素为空格，则push进入“%20”,最后将Array转化为String输出
// export default function replaceSpace(s) {
//   let result = [];
//   for (const char of s) result.push(char === " " ? "%20" : char);
//   return result.join("");
// }

//优化：初始化空String，遍历s，如果当前char为空格，则向后拼接“%20”，否则直接拼接char
export default function replaceSpace(s) {
  let result = "";
  for (const char of s) result += char === " " ? "%20" : char;
  return result;
}
