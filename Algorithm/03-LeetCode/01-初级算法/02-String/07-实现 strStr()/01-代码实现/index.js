//实际上就是实现indexOf方法
//console.log("Ashun".indexOf(""))

//将母字符串依次分割为多个长度等于子字符串的字符串，再与子字符串进行比较
// export default function strStr(haystack, needle) {
//   if (needle === "") return 0;
//   for (let i = 0; i <= haystack.length - needle.length; i++) {
//     let k = 0;
//     let count = 0;
//     for (let j = i; j < needle.length + i; j++) {
//       if (haystack[j] === needle[k]) {
//         count++;
//         k++;
//       } else {
//         break;
//       }
//     }

//     if (count === needle.length) {
//       return i;
//     }
//   }
//   return -1;
// }

//若结合原生API，会让代码更加简洁
//直接截取对应长度的string进行比较，减少了第二个for循环
export default function strStr(haystack, needle) {
  if (needle === "") return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let str = haystack.slice(i, i + needle.length);
    if (str === needle) return i;
  }
  return -1;
}
