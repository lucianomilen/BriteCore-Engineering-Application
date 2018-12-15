<template>
  <div >
    <div>
      <label>Search:
      <input v-on:change="filterColumn" type="text">
    </label>
    </div>
    <div class="container">
    <div v-on:click="sortColumn('Name')" class="item bold">Name</div>
    <div v-on:click="sortColumn('Description')" class="item bold">Description</div>
    <div v-on:click="sortColumn('Date')" class="item bold">Date</div>
    <div v-on:click="sortColumn('Amount')" class="item bold">Amount</div>
    </div>
    <div class="container" v-for="item in data" v-bind:key="item.ID">
      <div class="item">{{item.Name}}</div>
      <div class="item">{{item.Description}}</div>
      <div class="item">{{item.Date}}</div>
      <div class="item">{{item.Amount}}</div>

    </div>
  </div>
</template>

<script>
import data from '../assets/data/payment'

export default {
  name: 'DataTable',
  data () {
    return {
      data: data
    }
  },
  methods: {
    sortColumn: function (att) {
      data.sort((a, b) => {
        if (a[att] > b[att]) {
          return 1
        }
        if (a[att] < b[att]) {
          return -1
        }
        // a must be equal to b
        return 0
      })
    },
    filterColumn: function (e) {
      data.filter(item => {
        console.log(item.Name.match(e.target.value))
        return item.Name.indexOf(e.target.value) > -1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  .container {
    display: flex;
  }
  .item {
    flex: 1;
    border-bottom: 1px solid black;
  }
  .bold {
    font-weight: bold;
  }
</style>
