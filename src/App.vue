<template>
  <div id="app">
    <h1>BriteCore DataTable Component</h1>
    <DataTable v-bind:payments="payments" v-bind:labels="labels"/>
  </div>
</template>

<script>
import DataTable from './components/DataTable'
import payments from './assets/data/payment'
export default {
  name: 'app',
  components: {
    DataTable
  },
  data() {
    return {
    payments: payments,
      labels: Object.keys(payments[0])
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
  h1 {
    text-align: center;
  }
</style>
