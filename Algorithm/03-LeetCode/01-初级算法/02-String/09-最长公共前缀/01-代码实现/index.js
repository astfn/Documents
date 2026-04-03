//以第一个元素为基准，依次与其它元素进行比较
//将每次比较的结果，添加进入result数组，最后选取最小的值进行截取。就能够得到最长公共前缀

//比较过程：
//遍历header，指针不断向后移动，截取对应长度子字符串，与current进行比较
//若相同，则更新counter
//若不同，判断是否第一个元素就不同，如果第一个元素就不同，则最大公共长度为0，直接return ""
//否则 break （已找到current与header的最大公共长度）。

export default function longestCommonPrefix(strs) {
  let counter = 0;
  let header = strs[0];

  const res = [header.length];

  if (strs.length === 1) {
    return header;
  }

  for (let p = 1; p < strs.length; p++) {
    for (let i = 1; i <= header.length; i++) {
      const current = strs[p];
      if (header.slice(0, i) === current.slice(0, i)) {
        counter = i;
      } else {
        if (i === 1) {
          return "";
        } else {
          break;
        }
      }
    }
    res.push(counter);
  }
  return counter === 0 ? "" : header.slice(0, res.sort((a, b) => a - b)[0]);
}
