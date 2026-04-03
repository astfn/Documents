//方案一;
// export default function isValid(s) {
//   if (s.length % 2 !== 0) return false;
//   let stack = [];
//   for (let char of s) {
//     switch (char) {
//       case "(": {
//         stack.push(")");
//         break;
//       }
//       case "[": {
//         stack.push("]");
//         break;
//       }
//       case "{": {
//         stack.push("}");
//         break;
//       }
//       default: {
//         if (stack.length === 0 || stack.pop() != char) return false;
//       }
//     }
//   }
//   return !stack.length;
// }

//方案一优化
export default function isValid(s) {
  if (s.length % 2 !== 0) return false;

  let map = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  let stack = [];
  for (const char of s) {
    if (!map.has(char)) {
      stack.push(char);
    } else {
      if (!stack.length || map.get(char) !== stack.pop()) return false;
    }
  }
  return !stack.length;
}

//方案二
// export default function isValid(s) {
//   if (s.length % 2 !== 0) return false;

//   while (s.includes("()") || s.includes("[]") || s.includes("{}")) {
//     s = s.replace("()", "").replace("[]", "").replace("{}", "");
//   }
//   return !s.length;
// }
