
/**
 * Get random integer
 *
 * @param {number} min - The minimum number
 * @param {number} max - The maximum number
 * @returns {number} The random integer between minimum number and maximum number
 */
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export { getRandomInt };
