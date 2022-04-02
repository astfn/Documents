export default function() {
  const showPrice = (price, prefix = "￥") => {
    return `${prefix}${price}`;
  };
  return {
    showPrice,
  };
}
