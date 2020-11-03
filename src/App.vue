<template>
  <div id="app">
    <b-navbar :mobile-burger="false" shadow spaced>
        <template slot="brand" tag="router-link" :to="{ path: '/' }">
          <b-navbar-item class="title">
            <h1>Currency Converter</h1>
          </b-navbar-item>
        </template>
    </b-navbar>
    <div class="section">
      <currency-converter/>
    </div>
  </div>
</template>

<script>
import CurrencyConverter from './components/CurrencyConverter.vue'

export default {
  name: 'App',
  components: {
    'currency-converter': CurrencyConverter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
