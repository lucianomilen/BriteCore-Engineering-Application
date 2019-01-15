import { shallowMount } from '@vue/test-utils'
import DataTable from '../../src/components/DataTable.vue'
import payments from '../../src/assets/data/payment'

describe('DataTable.vue', () => {
  it('renders payments when passed', () => {
    expect(typeof DataTable.data).toBe('function')
    // const passedData = DataTable.data()
    // const passedData = shallowMount(DataTable, {
    //   propsData: {
    //     payments: payments,
    //     originalPayments: payments,
    //     labels: Object.keys(payments[0])
    //   }
    // })
    // console.log(wrapper)
    // expect(passedData.labels).toBe(labels)
  })
})
