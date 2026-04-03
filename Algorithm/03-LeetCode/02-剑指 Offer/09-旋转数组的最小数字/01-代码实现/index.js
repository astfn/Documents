// //方案一
// export default function minArray(numbers) {
//   return numbers.sort((a, b) => a - b)[0];
// }

// //方案二
// export default function minArray(numbers) {
//   return numbers.reduce((res, val) => (res > val ? val : res));
// }

// //方案三
// export default function minArray(numbers) {
//   let min = Infinity;
//   for (let i = 0; i < numbers.length; i++)
//     min = min > numbers[i] ? numbers[i] : min;

//   return min;
// }

//方案四
export default function minArray(numbers) {
  if (numbers.length === 1) return numbers[0];
  let f = 0;
  let s = 1;

  while (numbers[f] <= numbers[s]) {
    f++;
    s++;
  }

  if (s === numbers.length) return numbers[0];

  return numbers[s];
}
