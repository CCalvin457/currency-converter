<template>
    <section>
        <!-- conversion dropdown and textfields -->
        <div class="columns">
            <!-- Dropdown for currency 1 -->
            <div class="column">
                <b-dropdown v-model="currencyOne.currency">
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
            <div class="column">
                <b-button>Swap</b-button>
            </div>
            <!-- Dropdown for currency 2 -->
            <div class="column">
                <b-dropdown v-model="currencyTwo.currency">
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
        <!-- convert button (might be unnecessary) -->
        <div class="columns">
            <b-button>Convert</b-button>
        </div>
    </section>
</template>

<script>
import Cleave from 'cleave.js'
import { getCurrencies } from '../utils/currencyAPI.js'

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
    }
};
</script>

<style lang="scss" scoped></style>
