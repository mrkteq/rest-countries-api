/**
 * Format large numbers with commas (e.g., 1234567 -> "1,234,567")
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format population number
 */
export const formatPopulation = (population) => {
  return formatNumber(population);
};

