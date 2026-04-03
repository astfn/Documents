// //方案一

// export default function exist(board, word) {
//   let firstChars = [];
//   let res = [];
//   let itemCounter = 0;

//   //寻找起始节点,并将各个元素转化为node
//   board = board.map((line, y) =>
//     line.map((v, x) => {
//       let node = new Node(v, x, y);
//       word[0] === v && firstChars.push(node);
//       itemCounter++;
//       return node;
//     })
//   );

//   //特殊情况判断
//   if (firstChars.length && word.length === 1) return true;
//   if (word.length > itemCounter) return false;

//   //从起始节点开始查找
//   for (let firstChar of firstChars) {
//     res.push(testChar(firstChar, 1, [firstChar]));
//   }

//   return res.some((v) => v);

//   function Node(v, x, y) {
//     this.v = v || null;
//     this.x = x !== undefined ? x : null;
//     this.y = y !== undefined ? y : null;
//   }

//   function getAdjacent(route, word, test, x, y) {
//     if (test) {
//       return new Node();
//     }
//     //如果该节点已经走过了，并且还等于matchChar,则return一个空节点，后期testChar将返回false，同时，为了不影响后续结果，还要将该节点变为未走过的节点
//     let findIndex = route.findIndex((v) => v === board[y][x]);
//     if (findIndex !== -1) {
//       word === route[findIndex].v && route.splice(findIndex, 1);
//       return new Node();
//     }
//     return board[y][x];
//   }

//   function testChar(node, matchCharIndex, route) {
//     const { v, x, y } = node;
//     let top = getAdjacent(route, word[matchCharIndex], y === 0, x, y - 1);
//     let left = getAdjacent(route, word[matchCharIndex], x === 0, x - 1, y);
//     let right = getAdjacent(
//       route,
//       word[matchCharIndex],
//       x + 1 === board[0].length,
//       x + 1,
//       y
//     );
//     let bottom = getAdjacent(
//       route,
//       word[matchCharIndex],
//       y + 1 === board.length,
//       x,
//       y + 1
//     );

//     let adjacent = [top, right, bottom, left];

//     let findChars = adjacent.filter((node) => {
//       let isfind = node.v === word[matchCharIndex];
//       isfind && route.push(node);
//       return isfind;
//     });

//     if (findChars.length) {
//       let res = [];
//       for (const findChar of findChars) {
//         // console.log(findChar);
//         res.push(
//           matchCharIndex < word.length - 1
//             ? testChar(findChar, matchCharIndex + 1, route)
//             : true
//         );
//       }
//       return res.some((v) => v);
//     } else {
//       // console.log("route", route);
//       return false;
//     }
//   }
// }

export default function exist(board, word) {
  if (word.length > board.length * board[0].length) return false;

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (testChar(x, y, 0)) return true;
    }
  }
  return false;

  function testChar(x, y, matchCharIndex) {
    if (
      x < 0 ||
      y < 0 ||
      y >= board.length ||
      x >= board[y].length ||
      board[y][x] !== word[matchCharIndex]
    )
      return false;

    if (matchCharIndex === word.length - 1) return true;

    board[y][x] = " ";

    let res =
      testChar(x - 1, y, matchCharIndex + 1) ||
      testChar(x + 1, y, matchCharIndex + 1) ||
      testChar(x, y - 1, matchCharIndex + 1) ||
      testChar(x, y + 1, matchCharIndex + 1);

    board[y][x] = word[matchCharIndex];

    return res;
  }
}
