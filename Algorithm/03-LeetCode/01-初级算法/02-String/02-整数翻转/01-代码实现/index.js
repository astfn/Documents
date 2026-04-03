export default function reverse(x) {
  let toReverseArray = String(x).split("").reverse();
  if (toReverseArray[toReverseArray.length - 1] === "-") {
    toReverseArray.unshift(
      ...toReverseArray.splice(toReverseArray.length - 1, 1)
    );
  }
  let toNumber = Number(toReverseArray.join(""));
  if (Math.pow(2, 31) - 1 <= toNumber || toNumber <= -Math.pow(2, 31)) {
    return 0;
  }
  return toNumber;
}
