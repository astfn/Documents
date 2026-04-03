//方案一
//不能处理大数，js最大安全数 Math.pow(2, 53)-1 //9007199254740991
// export default function plusOne(digits) {
//   let toNumber = Number(digits.join(""));
//   toNumber++;
//   let toArray = (toNumber + "").split("").map((val) => Number(val));
//   return toArray;
// }

//方案二
//通过一个指针自后向前的不断移动，判断该元素是否为9，进行相应的处理
/*
 * 如果当前元素小于9，则让其++，直接return即可
 * 如果当前元素等于9，则还要判断当前point的位置
 * 如果 point 没有指向第一个元素，则都让其变为0，指针继续前移
 * 如果 point 已经指向了第一个元素，此时第一个元素为9，让其置为1，并在末尾添加0
 */
// export default function plusOne(digits) {
//   let p = digits.length - 1;
//   return deep(digits, p);

//   function deep(digits, p) {
//     if (digits[p] < 9) {
//       digits[p]++;
//       return digits;
//     } else {
//       if (p > 0) {
//         digits[p] = 0;
//         p--;
//       } else if (p === 0) {
//         digits[p] = 1;
//         digits[digits.length] = 0;
//         return digits;
//       }
//       return deep(digits, p);
//     }
//   }
// }

//方案三
export default function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    } else {
      digits[i] = 0;
    }
  }

  digits[0] = 1;
  digits[digits.length] = 0;

  return digits;
}
