export default function isValidSudoku(board) {
  const rows = {};
  const cols = {};
  const box = {};

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const num = board[i][j];
      if (num !== ".") {
        const rowIndex = i;
        const colIndex = j;
        const boxIndex =
          Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
        if (
          rows[`${rowIndex}_${num}`] ||
          cols[`${colIndex}_${num}`] ||
          box[`${boxIndex}_${num}`]
        ) {
          return false;
        }
        rows[`${rowIndex}_${num}`] = true;
        cols[`${colIndex}_${num}`] = true;
        box[`${boxIndex}_${num}`] = true;
      }
    }
  }
  return true;
}
