require('dotenv').config();

export async function getCurrencies() {
    let currencies = JSON.parse(localStorage.getItem('currencies'));
    // console.log(currencies);
    if(currencies === null) {
        currencies = [];
        // get currency from currencyconverterapi.com
        let apiResult = await fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${process.env.VUE_APP_CURRENCY_API}`)
        .catch(error => {
            console.error(`Error: ${error}`);
        });

        // getting the json data
        let data = await apiResult.json();
        
        for(var currency in data.results) {
            currencies.push(currency);
        }

        localStorage.setItem('currencies', JSON.stringify(currencies));
    }

    return currencies;
}

