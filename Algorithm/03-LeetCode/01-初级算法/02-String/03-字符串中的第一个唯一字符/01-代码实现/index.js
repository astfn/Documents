/* 方案一 */
//* 循环遍历每一个元素
//* 从原数组filter出与之相等的元素
//* 判断返回Array的长度，如果等于1，则直接return 当前 index
//* 最后若没找到，return -1

// //但是该方案每次都需要进行filter，性能不是很好，leetcode超时执行
export default function firstUniqChar(s) {
  const toArray = s.split("");
  for (const [index, item] of Object.entries(toArray)) {
    const size = toArray.filter((v) => v === item).length;
    if (size === 1) {
      return index;
    }
  }
  return -1;
}

/* 方案二 */
//判断 indexOf(item)===lastIndexOf(item)
//该方案很精妙，如果自前向后找、自后向前找。所返回的index相同，很显然该元素只出现了一次
// export default function firstUniqChar(s) {
//   for (let i = 0; i < s.length; i++) {
//     if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
//       return i;
//     }
//   }
//   return -1;
// }

/* 方案三 */
// //遍历
// export default function firstUniqChar(s) {
//   if (s.length === 1) return 0;
//   for (let i = 0; i < s.length; i++) {
//     let flag = true;
//     for (let j = 0; j < s.length; j++) {
//       if (j == i) continue;
//       if (s[i] !== s[j]) {
//         flag = false;
//       }
//       if (s[i] === s[j]) {
//         flag = true;
//         break;
//       }
//     }
//     if (!flag) {
//       return i;
//     }
//   }
//   return -1;
// }
