/* 方案一 */
export default function myAtoi(s) {
  const reg = /[+-]?\d+/;
  if (!reg.test(s)) return 0;
  const res = Number(s.match(reg)[0]);
  if (res > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
  if (res < -Math.pow(2, 31)) return -Math.pow(2, 31);
  return res;
}

// export default function myAtoi(s) {
//   const res = parseInt(s);
//   if (Number.isNaN(res)) return 0;
//   if (res > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
//   if (res < -Math.pow(2, 31)) return -Math.pow(2, 31);
//   return res;
// }
