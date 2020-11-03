/**
 * returns a string representation of a number with comma separators
 * 
 * @param {number} number The number to convert
 * @returns {string} The string representation of a number with comma separators
 */
export function toNumberWithCommas(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}


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