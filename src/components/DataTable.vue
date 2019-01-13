<template>
  <div>
    <div>
      <label>Search:
        <input v-on:change="filterColumn" type="text">
        <span v-on:click="clearSearch">
          <font-awesome-icon icon="times"/>
        </span>
      </label>
    </div>
    <div class="container">
      <div class="item th bold">Name
        <font-awesome-icon v-on:click="sortColumn('Name')" icon="sort"/>
        <font-awesome-icon v-on:click="sortColumn('Name')" icon="sort-up"/>
        <font-awesome-icon v-on:click="sortColumn('Name')" icon="sort-down"/>
      </div>
      <div class="item th bold">Description
        <font-awesome-icon v-on:click="sortColumn('Description')" icon="sort"/>
        <font-awesome-icon v-on:click="sortColumn('Description')" icon="sort-up"/>
        <font-awesome-icon v-on:click="sortColumn('Description')" icon="sort-down"/>
      </div>
      <div class="item th bold">Date
        <font-awesome-icon v-on:click="sortColumn('Date')" icon="sort"/>
        <font-awesome-icon v-on:click="sortColumn('Date')" icon="sort-up"/>
        <font-awesome-icon v-on:click="sortColumn('Date')" icon="sort-down"/>
      </div>
      <div class="item th bold">Amount
        <font-awesome-icon v-on:click="sortColumn('Amount')" icon="sort"/>
        <font-awesome-icon v-on:click="sortColumn('Amount')" icon="sort-up"/>
        <font-awesome-icon v-on:click="sortColumn('Amount')" icon="sort-down"/>
      </div>
    </div>
    <div class="container" v-for="item in payments" v-bind:key="item.ID">
      <div class="item">{{item.Name}}</div>
      <div class="item flex justify" v-show="!item.edit" @mouseover="showEdit = item" @mouseout="showEdit = null">
        <div>
          {{item.Description}}
        </div>
        <div v-on:click="editItem(item)" v-show="showEdit === item">
          <font-awesome-icon class="edit-icon" icon="pencil-alt"/>
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
        ascending: false,
        showEdit: {}
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
  .flex {
    display: flex;
  }
  .justify {
    justify-content: space-between;
  }
  .edit-icon {
    cursor: pointer;
  }
</style>
