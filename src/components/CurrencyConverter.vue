<template>
    <section>
        <!-- conversion dropdown and textfields -->
        <div class="columns">
            <!-- Dropdown for currency 1 -->
            <div class="column">
                <b-dropdown>
                    <button class="button is-primary" slot="trigger" slot-scope="{ active }">
                        <span>Select Currency...</span>
                        <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                    </button>
                </b-dropdown>

                <b-field>
                    <b-input v-model="currencyOne"
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
                <b-dropdown>
                    <button class="button is-primary" slot="trigger" slot-scope="{ active }">
                        <span>Select Currency...</span>
                        <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                    </button>
                </b-dropdown>

                <b-field>
                    <b-input v-model="currencyTwo"
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
        }
    })
};
</script>

<style lang="scss" scoped></style>
