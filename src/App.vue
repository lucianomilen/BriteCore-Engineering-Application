<template>
  <div id="app">
    <h1>DataTable Component</h1>
    <DataTable/>
  </div>
</template>

<script>
import DataTable from './components/DataTable'

export default {
  name: 'app',
  components: {
    DataTable
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
