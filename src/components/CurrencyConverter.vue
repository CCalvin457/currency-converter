<template>
    <section class="container" is-fluid is-fullhd>
        <!-- conversion dropdown and textfields -->
        <div class="columns" is-centered>
            <!-- Dropdown for currency 1 -->
            <div class="column" is-5>
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

                <b-field>
                    <b-input v-model="currencyOne.value"
                        v-cleave="masks.numeral"
                        icon="currency-usd"></b-input>
                </b-field>
            </div>
            <!-- Swaps the two selected currencies -->
            <div class="column" is-2>
                <b-button icon-right="swap-horizontal-bold" is-large></b-button>
            </div>
            <!-- Dropdown for currency 2 -->
            <div class="column" is-5>
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

                <b-field>
                    <b-input v-model="currencyTwo.value"
                        disabled
                        v-cleave="masks.numeral"
                        icon="currency-usd"></b-input>
                </b-field>
            </div>
        </div>
        <!-- Calls function to convert amount to target currency -->
        <div class="columns" is-centered>
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
            value: '0.00',
            currency: ''
        },
        currencyTwo: {
            value: '0.00',
            currency: ''
        },
        currencies: []
    }),

    async mounted() {
        this.currencies = await getCurrencies()
    },

    methods: {
        async convertCurrency() {
            let amount = this.currencyOne.value.replace('/,/g', '');
            amount = Number(amount);
            let fromCurrency = this.currencyOne.currency;
            let toCurrency = this.currencyTwo.currency;

            let convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);

            this.currencyTwo.value = toNumberWithCommas(convertedAmount);
        }
    }
};
</script>

<style lang="scss" scoped></style>
