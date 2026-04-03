//遍历字符串，记录每一个字符出现的次数
//注意点：如果前一个字符与当前字符相等(字符是连续的)，则在旧的计数器上++
//反之，push进新的记录项

export default function countAndSay(n) {
  let series = "1";
  let counter = 1;
  while (counter < n) {
    series = operate(series);
    counter++;
  }
  return series;

  function operate(series) {
    let info = [];
    for (let i = 0; i < series.length; i++) {
      const val = series[i];
      if (i === 0) {
        info.push({ val, leng: 1 });
        continue;
      }

      const isContinuity = info[info.length - 1].val === val;

      if (isContinuity) {
        info[info.length - 1].leng++;
      } else {
        info.push({ val, leng: 1 });
      }
    }
    let result = info.map((item) => `${item.leng}${item.val}`).join("");
    return result;
  }
}
