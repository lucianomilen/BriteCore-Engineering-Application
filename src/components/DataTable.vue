<template>
  <div>
    <div>
      <label>Search:
        <input v-on:change="filterColumn" type="text">
        <button v-on:click="clearSearch">clear</button>
      </label>
    </div>
    <div class="container">
      <div v-on:click="sortColumn('Name')" class="item th bold">Name</div>
      <div v-on:click="sortColumn('Description')" class="item th bold">Description</div>
      <div v-on:click="sortColumn('Date')" class="item th bold">Date</div>
      <div v-on:click="sortColumn('Amount')" class="item th bold">Amount</div>
      <!--<div class="item th bold">Actions</div>-->
    </div>
    <div class="container" v-for="item in payments" v-bind:key="item.ID">
      <div class="item">{{item.Name}}</div>
      <div class="item" v-show="!item.edit">
        <div>
          {{item.Description}}
        </div>
      <div v-on:click="editItem(item)">
          edit
      </div>
      </div>
      <input class="item" v-show="item.edit" v-model="item.Description" v-on:blur="item.edit=false"
             @keyup.enter="item.edit=false"/>
      <div class="item">{{item.Date}}</div>
      <div class="item">{{item.Amount}}</div>
      <!--<div class="item" v-on:click="editItem(item)" >edit</div>-->
    </div>
  </div>
</template>

<script>
  import payments from '../assets/data/payment'

  export default {
    name: 'DataTable',
    data() {
      return {
        payments: payments,
        originalPayments: payments,
        ascending: false
      }
    },
    methods: {
      sortColumn: function (att) {
        this.ascending = !this.ascending
        payments.sort((a, b) => {
          if (a[att] > b[att]) {
            return this.ascending ? 1 : -1
          }
          if (a[att] < b[att]) {
            return this.ascending ? -1 : 1
          }
          // a must be equal to b
          return 0
        })
      },
      filterColumn: function (e) {
        this.payments = payments.filter(item => {
          if (item.Name.toLowerCase().match(e.target.value)) {
            return true
          }
        })
      },
      clearSearch: function () {
        this.payments = this.originalPayments
      },
      editItem: function (item) {
        this.$set(item, 'edit', true)
        console.log(item)
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

  .th {
    cursor: pointer;
  }

  .bold {
    font-weight: bold;
  }
</style>
