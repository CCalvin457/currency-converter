/**
 * returns a string representation of a number with comma separators
 * 
 * @param {number} number The number to convert
 * @returns {string} The string representation of a number with comma separators
 */
export function toNumberWithCommas(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}