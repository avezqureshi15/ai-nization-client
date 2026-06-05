export const generateSparkData = (trend = "down", len = 40) => {
  let val = 50 + Math.random() * 10;
  return Array.from({ length: len }, () => {
    val += (Math.random() - (trend === "down" ? 0.55 : 0.45)) * 3;
    return Math.max(10, Math.min(90, val));
  });
};