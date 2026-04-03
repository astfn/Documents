/*  方案一*/
// 去除两端空格
// 判断符号、数字。push入Array
// 将Array转化为Number
// 判断数字是否越界
// export default function strToInt(str) {
//   str = str.trim();
//   let toArr = [];

//   for (let i = 0; i < str.length; i++) {
//     if (i === 0) {
//       if (str[i] === "-" || str[i] === "+" || /[0-9]/.test(str[i]))
//         toArr.push(str[i]);
//       else break;
//     } else {
//       if (/[0-9]/.test(str[i])) toArr.push(str[i]);
//       else break;
//     }
//   }

//   let toNum = toArr.join("") * 1;
//   toNum = toNum ? toNum : 0;

//   if (toNum < -Math.pow(2, 31) || toNum > Math.pow(2, 31) - 1) {
//     toNum = toNum < 0 ? -Math.pow(2, 31) : Math.pow(2, 31) - 1;
//   }

//   return toNum;
// }

/*  方案二 */
// //巧用正则
// export default function strToInt(str) {
//   let numInfo = str.trim().match(/^[+-]?\d+/);
//   if (!numInfo) return 0;

//   let num = numInfo[0] * 1;
//   if (num < -Math.pow(2, 31) || num > Math.pow(2, 31) - 1) {
//     num = num < 0 ? -Math.pow(2, 31) : Math.pow(2, 31) - 1;
//   }
//   return num;
// }

/*  方案三 */
//parseInt
export default function strToInt(str) {
  const res = parseInt(str);
  if (Number.isNaN(res)) return 0;
  if (res > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
  if (res < -Math.pow(2, 31)) return -Math.pow(2, 31);
  return res;
}
