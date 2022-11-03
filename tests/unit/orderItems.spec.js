/* eslint-disable */
import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
// import { shallowMount} from '@vue/test-utils';
import { expect } from 'chai';
import messages from './messages';
import OrderItems from '../../src/views/fulfillment/orderedItems/orderItems.vue'
import store from './store';
import { createStore } from 'vuex'
import { mount } from '@vue/test-utils'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
});

describe('OrderItems.vue', () => {
    // wrapper = shallowMount(OrderItems, { i18n, store, localVue, router, sync: false, });
    //const store = createStore({
      // state() {
      //   return {
      //     data: {
      //       seller_name: 'Carols Store',
      //       consolidated: false,
      //       order_status: 'event.delivery.order.created',
      //       order_completion_date: 123456789,
      //       scheduled_delivery_date: 123456789,
      //       estimated_delivery_date: 123456789,
      //       confirmation_pin: 2345,
      //       partner_contact_information: {},
      //       products: [
      //         {
      //           product_name: 'Pen',
      //           product_variant_description: 'Blue',
      //           product_unit_price: 20,
      //           product_unit_price_currency: 'KES',
      //           product_unit_count: 1,
      //           product_image_link:
      //               'https://s3.eu-west-1.amazonaws.com/sendy-partner-docs/fulfillment_products/B-XTC-2669_1634466113428_image_picker_DB31D551-4BE6-40A3-985C-97D31E6DC4B0-1173-000000F648645A2F.jpg',
      //         },
      //       ],
      //       event_time_line: [
      //         {
      //           event_code: 'event.delivery.order.created',
      //           event_date: 123456789,
      //         },
      //       ],
      //       destination: {
      //         name: 'Jim Wanjogu',
      //         phone_number: '+254723333444',
      //         delivery_location: {
      //           description: 'Garden City, Thika Road, Nairobi',
      //           longitude: 12.34534535,
      //           latitude: 34.12323343,
      //         },
      //         house_location: 'House 3R ,4th Floor, Airpods Apartments',
      //         delivery_instructions: 'Leave at the door',
      //       },
      //     }
      //   }
      // },
      // getters: {
      //   getData: (state) => state.data?.products
      // },
      // mutations: {
      //   setData(state, val = data) {
      //     state.data = val;
      //   },
      // }
    //})
    // store.commit('setData')
  const wrapper = mount(OrderItems, {
    global: {
      plugins: [store, ElementPlus, i18n]
    }
  })
  console.log(wrapper);
  it('check if products are retrieved correctly ', async () => {
    // await wrapper.vm.orderItems;
    // expect(wrapper.vm.orderItems).to.be.an('array').with.lengthOf(1);
  });
});
