<template>
    <section class="container" is-fluid is-fullhd>
        <div class="section" v-if="areCurrenciesSelected === false">
            <b-message title="Missing Input" type="is-danger" has-icon aria-close-label="close message">
                There is one or more currencies missing. Please make sure to select a currency from both drop down menus.
            </b-message>
        </div>
        <!-- conversion dropdown and textfields -->
        <div class="columns is-centered">
            <!-- Dropdown for currency 1 -->
            <div class="column is-5">
                <section>
                    <b-dropdown v-model="currencyOne.currency" scrollable>
                        <button class="button is-primary" slot="trigger" slot-scope="{ active }">
                            <span>{{currencyOne.currency === '' ? 'Select Currency...' : currencyOne.currency}}</span>
                            <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                        </button>
    
                        <b-dropdown-item aria-role="listItem"
                            :value="currency.id"
                            v-for="currency in currencies" :key="currency.id"
                        >{{currency.currencyName}} ({{currency.id}})</b-dropdown-item>
                    </b-dropdown>
                </section>

                <section class="section">
                    <b-field>
                        <b-input v-model="currencyOne.value"
                            placeholder="0.00"
                            v-cleave="masks.numeral"
                            icon="currency-usd"></b-input>
                    </b-field>
                </section>
            </div>
            <!-- Swaps the two selected currencies -->
            <div class="column is-2">
                <b-button icon-right="swap-horizontal-bold" 
                    size="is-medium"
                    @click="swapCurrencies"
                ></b-button>
            </div>
            <!-- Dropdown for currency 2 -->
            <div class="column is-5">
                <section>
                    <b-dropdown v-model="currencyTwo.currency" scrollable>
                        <button class="button is-primary" slot="trigger" slot-scope="{ active }">
                            <span>{{currencyTwo.currency === '' ? 'Select Currency...' : currencyTwo.currency}}</span>
                            <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                        </button>
    
                         <b-dropdown-item aria-role="listItem"
                            :value="currency.id"
                            v-for="currency in currencies" :key="currency.id"
                        >{{currency.currencyName}} ({{currency.id}})</b-dropdown-item>
                    </b-dropdown>
                </section>

                <section class="section">
                    <b-field>
                        <b-input v-model="currencyTwo.value"
                            placeholder="0.00"
                            disabled
                            v-cleave="masks.numeral"
                            icon="currency-usd"></b-input>
                    </b-field>
                </section>
            </div>
        </div>
        <!-- Calls function to convert amount to target currency -->
        <div class="columns is-centered">
            <div class="column" is-half>
                <b-button @click="convertCurrency">Convert</b-button>
            </div>
        </div>
    </section>
</template>

<script>
import Cleave from 'cleave.js'
import { getCurrencies, convertCurrency } from '../utils/currencyAPI.js'
import { toNumberWithCommas } from '../utils/general.js'

const cleave = {
        name: 'cleave',
        bind(el, binding) {
            const input = el.querySelector('input')
            input._vCleave = new Cleave(input, binding.value)
        },
        unbind(el) {
            const input = el.querySelector('input')
            input._vCleave.destroy()
        }
    }
export default {
    directives: { cleave },
    data: () => ({
        masks: {
            numeral: {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
            }
        },
        currencyOne: {
            value: '',
            currency: ''
        },
        currencyTwo: {
            value: '',
            currency: ''
        },
        currencies: [],
        areCurrenciesSelected: true
    }),

    async mounted() {
        this.currencies = await getCurrencies()
    },

    methods: {
        async convertCurrency() {
            if(this.currencyOne.currency === '' || this.currencyTwo.currency === '') {
                this.areCurrenciesSelected = false;
                return;
            }
            this.areCurrenciesSelected = true;

            let amount = this.currencyOne.value.replace(/,/g, '');
            
            if(this.currencyOne.value === '' || isNaN(amount)) {
                this.currencyOne.value = "0.00"
            }

            let fromCurrency = this.currencyOne.currency;
            let toCurrency = this.currencyTwo.currency;

            let convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);

            this.currencyTwo.value = toNumberWithCommas(convertedAmount);
        },

        swapCurrencies() {
            let temp = this.currencyOne;
            this.currencyOne = this.currencyTwo;
            this.currencyTwo = temp;
        }
    }
};
</script>

<style lang="scss" scoped></style>
