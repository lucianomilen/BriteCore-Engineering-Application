<template>
  <div>
    <div class="search-container">
        <input v-on:change="filterColumn" v-model="searchTerm" class="search-input" placeholder="Enter the search term" type="text">
        <div v-on:click="clearSearch">
          <font-awesome-icon icon="times" class="times-icon"/>
        </div>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="th bold">Name
          <!--<font-awesome-icon v-on:click="sortColumn('Name', 0)" icon="sort"/>-->
          <font-awesome-icon v-on:click="sortColumn('Name', 0)" v-show="!sortData[0]" icon="sort-up"/>
          <font-awesome-icon v-on:click="sortColumn('Name', 0)" v-show="sortData[0]" icon="sort-down"/>
        </div>
        <div class="th bold">Description
          <!--<font-awesome-icon v-on:click="sortColumn('Description', 1)" icon="sort"/>-->
          <font-awesome-icon v-on:click="sortColumn('Description', 1)" v-show="!sortData[1]" icon="sort-up"/>
          <font-awesome-icon v-on:click="sortColumn('Description', 1)" v-show="sortData[1]" icon="sort-down"/>
        </div>
        <div class="th bold">Date
          <!--<font-awesome-icon v-on:click="sortColumn('Date', 2)" icon="sort"/>-->
          <font-awesome-icon v-on:click="sortColumn('Date', 2)" v-show="!sortData[2]" icon="sort-up"/>
          <font-awesome-icon v-on:click="sortColumn('Date', 2)" v-show="sortData[2]" icon="sort-down"/>
        </div>
        <div class="th bold">Amount
          <!--<font-awesome-icon v-on:click="sortColumn('Amount', 3)" icon="sort"/>-->
          <font-awesome-icon v-on:click="sortColumn('Amount', 3)" v-show="!sortData[3]" icon="sort-up"/>
          <font-awesome-icon v-on:click="sortColumn('Amount', 3)" v-show="sortData[3]" icon="sort-down"/>
        </div>
      </div>
      <div class="container row-item" v-for="item in payments" v-bind:key="item.ID">
        <div class="item">{{item.Name}}</div>
        <div class="item flex justify" v-show="!item.edit" @mouseover="showEdit = item" @mouseout="showEdit = null">
          <div>
            {{item.Description}}
          </div>
          <div v-on:click="editItem(item)" v-show="showEdit === item">
            <font-awesome-icon class="edit-icon" icon="pencil-alt"/>
          </div>
        </div>
        <input class="item description-input" v-show="item.edit" v-model="item.Description" v-on:blur="item.edit=false"
               @keyup.enter="item.edit=false"/>
        <div class="item">{{item.Date}}</div>
        <div class="item">{{item.Amount}}</div>
      </div>
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
        showEdit: {},
        searchTerm: "",
        sortData: [false,false,false,false]
      }
    },
    methods: {
      sortColumn: function (att, sortPos) {
        this.ascending = !this.ascending
        this.sortData[sortPos] = !this.sortData[sortPos]
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
        this.searchTerm = ""
      },
      editItem: function (item) {
        this.$set(item, 'edit', true)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $primary-green: #42b983;
  $grayish: #d0dfe2;
  $whitish: #f2f6f7;
  $aquamarine: #2c3e50;
  $greenish: #ecf2f3;
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
    color: $primary-green;
  }

  .container {
    display: flex;
  }

  .item {
    flex: 1;
    border-bottom: 1px solid $grayish;
    padding: 12px;
  }
  .row-item {
    transition: background-color .25s ease;
    transition-property: background-color;
    transition-duration: 0.25s;
    transition-timing-function: ease;
    transition-delay: 0s;
  }

  .row-item:hover {
    background-color: $greenish;
  }

  .th {
    cursor: pointer;
    flex: 1;
    padding: 0 12px;
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
    color: $grayish;
  }
  .edit-icon:hover {
    color: $primary-green;
  }
  .table-header {
    background: $whitish;
    color: $aquamarine;
    display: flex;
    align-items: center;
    padding: .75em 0;
    border-radius: 4px 4px 0 0;
    font-size: .9rem;
    border-bottom: 1px solid $grayish;
  }

  .table {
    border: 1px solid $grayish;
    border-radius: 4px;
  }
  .search-container {
    border: 1px solid $grayish;
    width: 300px;
    display: flex;
    height: 40px;
    border-radius: 4px;
    padding-right: 10px;
    align-items: center;
    margin: 0 auto 12px;
  }
  .search-input {
    border: none;
    /*border-right: 1px solid #d0dfe2;*/
    flex: 1;
    text-indent: 10px;
    font-size: 1em;
    height: 90%;
    outline: none;
  }
  .times-icon {
    cursor: pointer;
    color: $grayish;
  }
  .times-icon:hover {
    color: $primary-green;
  }
  .description-input {
    border: 1px solid $grayish;
    font-size: 14px;
    color: $aquamarine;
  }
</style>
