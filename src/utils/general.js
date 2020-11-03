/**
 * returns a string representation of a number with comma separators
 * 
 * @param {number} number The number to convert
 * @returns {string} The string representation of a number with comma separators
 */
export function toNumberWithCommas(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Returns an array of sorted objects. Objects are sorted by a specific key value
 * 
 * @param {array} items The array of objects that needs to be sorted
 * @param {string} sortBy The key to sort the array of objects by
 * @returns {array} The sorted array of objects
 */
export function sortObjArrayAscending(items, sortBy) {
    items.sort((a,b) => {
        if(a[sortBy] < b[sortBy]) {
            return -1;
        }

        if(a[sortBy] > b[sortBy]) {
            return 1;
        }

        return 0;
    });

    return items;
}