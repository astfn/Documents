export default function maxProfit(prices) {
  let total = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      total += prices[i] - prices[i - 1];
    }
  }
  return total;
}
