<template>
  <div>
    <div class="search-container">
      <input v-on:change="filterName" v-model="searchTerm" class="search-input" placeholder="Enter the search term"
             type="text">
      <div v-on:click="clearSearch">
        <font-awesome-icon icon="times" class="times-icon"/>
      </div>
    </div>
    <div class="filter-container">
      <div v-on:click="displayFilter = !displayFilter">
        <font-awesome-icon icon="filter" class="filter-icon"/>
      </div>
      <div class="hidden-filter" v-bind:class="{'visible-filter': displayFilter}">
        <label> Date
          <select v-on:change="filterYear" v-model="selectedYear">
            <option v-bind:value="null">all</option>
            <option v-bind:value="2017">2017</option>
            <option v-bind:value="2018">2018</option>
            <option v-bind:value="2019">2019</option>
          </select>
        </label>
        <label> Amount
          <select v-on:change="filterAmount" v-model="selectedAmount">
            <option v-bind:value="null">all</option>
            <option v-bind:value="{min: -1000, max: -500}">-1000 to -500</option>
            <option v-bind:value="{min: -500, max: 0}">-500 to 0</option>
            <option v-bind:value="{min: 0, max: 500}">0 to 500</option>
            <option v-bind:value="{min: 500, max: 1000}">500 to 1000</option>
          </select>
        </label>
      </div>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="th bold">Name
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Name', 0)" icon="sort"
                             v-show="sortData[0] === 0"/>
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Name', 0)" v-show="sortData[0] === 1"
                             icon="sort-up"/>
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Name', 0)" v-show="sortData[0] === 2"
                             icon="sort-down"/>
        </div>
        <div class="th bold fl-2">Description
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Description', 1)" icon="sort"
                             v-show="sortData[1] === 0"/>
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Description', 1)" v-show="sortData[1] === 1"
                             icon="sort-up"/>
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Description', 1)" v-show="sortData[1] === 2"
                             icon="sort-down"/>
        </div>
        <div class="th bold">Date
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Date', 2)" icon="sort"
                             v-show="sortData[2] === 0"/>
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Date', 2)" v-show="sortData[2] === 1"
                             icon="sort-up"/>
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Date', 2)" v-show="sortData[2] === 2"
                             icon="sort-down"/>
        </div>
        <div class="th bold">Amount
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Amount', 3)" icon="sort"
                             v-show="sortData[3] === 0"/>
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Amount', 3)" v-show="sortData[3] === 1"
                             icon="sort-up"/>
          <font-awesome-icon class="sort-icon" v-on:click="sortColumn('Amount', 3)" v-show="sortData[3] === 2"
                             icon="sort-down"/>
        </div>
      </div>
      <div class="container row-item" v-for="item in payments" v-bind:key="item.ID">
        <div class="item">{{item.Name}}</div>
        <div class="item justify flex fl-2" v-show="!item.edit" @mouseover="showEdit = item"
             @mouseout="showEdit = null">
          <div>
            {{item.Description}}
          </div>
          <div v-on:click="editItem(item)" v-show="showEdit === item">
            <font-awesome-icon class="edit-icon" icon="pencil-alt"/>
          </div>
        </div>
        <input class="item description-input" v-show="item.edit" v-model="item.Description" v-on:blur="item.edit=false"
               @keyup.enter="item.edit=false"/>
        <div class="item">{{item.Date | moment}}</div>
        <div class="item">{{item.Amount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import payments from '../assets/data/payment'
  import moment from 'moment'

  export default {
    name: 'DataTable',
    data() {
      return {
        payments: payments,
        originalPayments: payments,
        ascending: false,
        showEdit: {},
        searchTerm: "",
        sortData: [0, 0, 0, 0],
        selectedAmount: null,
        selectedYear: null,
        displayFilter: false
      }
    },
    methods: {
      sortColumn: function (att, sortPos) {
        this.ascending = !this.ascending
        switch (this.sortData[sortPos]) {
          case 0:
            this.sortData.fill(0)
            this.sortData[sortPos] = 1
            break
          case 1:
            this.sortData.fill(0)
            this.sortData[sortPos] = 2
            break
          case 2:
            this.sortData.fill(0)
            this.sortData[sortPos] = 1
            break
        }
        // this.sortData[sortPos] = !this.sortData[sortPos]
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
      filterName: function (e) {
        this.payments = this.payments.filter(item => {
          if (item.Name.toLowerCase().match(e.target.value)) {
            return true
          }
        })
      },
      clearSearch: function () {
        this.payments = this.originalPayments
        this.searchTerm = ""
        this.selectedAmount = null
        this.selectedYear = null
      },
      editItem: function (item) {
        this.$set(item, 'edit', true)
      },
      filterYear: function () {
        if(!this.selectedYear)
          this.payments = this.originalPayments
        else
        this.payments = this.payments.filter(item => {
          if (moment(item.Date).year() === this.selectedYear) {
            return true
          }
        })
      },
      filterAmount: function () {
        if(!this.selectedAmount)
          this.payments = this.originalPayments
        else
        this.payments = this.payments.filter(item => {
          if ((this.selectedAmount.min <= item.Amount && item.Amount <= this.selectedAmount.max)) {
            return true
          }
        })
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).format('MMMM Do YYYY, HH:mm')
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
    flex: 1;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fl-2 {
    flex: 2;
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
  .filter-icon {
    cursor: pointer;
    color: $primary-green;
  }
  .description-input {
    border: 1px solid $grayish;
    font-size: 14px;
    color: $aquamarine;
    flex: 2;
  }

  .sort-icon {
    cursor: pointer;
    color: darkgray;
    padding: 5px;
  }

  .sort-icon:hover {
    color: $primary-green;
  }

  .filter-container {
    display: flex;
    margin-bottom: 12px;
  }
  .hidden-filter {
    visibility: hidden;
    transform: translate(-10px);
    opacity: 0;
    transition: visibility 0s, transform 0.1s linear;
  }
  .visible-filter {
    visibility: visible;
    transform: translate(10px);
    opacity: 1;
  }
</style>
