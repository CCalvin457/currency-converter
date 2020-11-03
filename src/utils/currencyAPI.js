require('dotenv').config();
import { sortObjArrayAscending } from './general.js'

/**
 * Returns the list of currencies from free.currconv.com
 *
 * @return {array} currencies with currency name and id.
 */

export async function getCurrencies() {
    let currencies = JSON.parse(localStorage.getItem('currencies'));
    
    if(currencies === null) {
        currencies = [];
        // get currency from currencyconverterapi.com
        let url = `https://free.currconv.com/api/v7/currencies?apiKey=${process.env.VUE_APP_CURRENCY_API}`
        let apiResult = await fetch(url)
        .catch(error => {
            console.error(`Error: ${error}`);
        });

        // getting the json data
        let data = await apiResult.json();
        data = data.results;

        for(var currency in data) {
            currencies.push({
                id: data[currency].id,
                currencyName: data[currency].currencyName
            });
        }
        currencies = sortObjArrayAscending(currencies, "id");
        localStorage.setItem('currencies', JSON.stringify(currencies));
    }

    return currencies;
}

/**
 * Returns amount converted to target currency
 * 
 * @param {number} amount The amount to be converted
 * @param {string} from The original currency
 * @param {string} to The currency to be converted to
 * @return {number} The converted amount
 */
export async function convertCurrency(amount, from, to) {
    let fromCurrency = encodeURIComponent(from);
    let toCurrency = encodeURIComponent(to);
    let query = fromCurrency + "_" + toCurrency;

    let url = `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${process.env.VUE_APP_CURRENCY_API}`;
    
    let apiResult = await fetch(url).catch(error => {
        console.error(`Error: ${error}`);
    });
    
    let data = await apiResult.json();

    let total = amount * data[query];

    total = (Math.round(total * 100) / 100).toFixed(2);

    return total;
}