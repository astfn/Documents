// export default function fib(n) {
//   if (n == 0) return 0;
//   if (n == 1) return 1;

//   let res = [0, 1];

//   for (let i = 0; i <= n - 2; i++) {
//     res.push((res[res.length - 1] + res[res.length - 2]) % 1000000007);
//   }
//   return res[res.length - 1];
// }

export default function fib(n) {
  if (n === 0) return 0;

  let first = 0;
  let second = 1;
  let res = 1;

  while (n > 2) {
    first = second;
    second = res;
    res = (first + second) % 1000000007;
    n--;
  }

  return res;
}
