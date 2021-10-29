/* eslint-disable */
// import Vuex from 'vuex';
// import { expect } from 'chai';
// import ElementUI from 'element-ui';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import Rating from '../../../src/views/fulfillment/rating.vue';

// const localVue = createLocalVue();

// localVue.use(Vuex);
// localVue.use(ElementUI);
// localVue.use(FontAwesomeIcon);

// let store;
// let getters;
// let wrapper;

// const orderData = {
//   message: 'order.retrieve.success',
//   data: {
//     seller_name: 'Carols Store',
//     consolidated: false,
//     order_status: 'event.delivery.order.created',
//     order_completion_date: 123456789,
//     scheduled_delivery_date: 123456789,
//     estimated_delivery_date: 123456789,
//     confirmation_pin: 2345,
//     partner_contact_information: {},
//     products: [
//       {
//         product_name: 'Pen',
//         product_variant_description: 'Blue',
//         product_unit_price: 20,
//         product_unit_price_currency: 'KES',
//         product_unit_count: 1,
//         product_image_link:
//           'https://s3.eu-west-1.amazonaws.com/sendy-partner-docs/fulfillment_products/B-XTC-2669_1634466113428_image_picker_DB31D551-4BE6-40A3-985C-97D31E6DC4B0-1173-000000F648645A2F.jpg',
//       },
//     ],
//     event_time_line: [
//       {
//         event_code: 'event.delivery.order.created',
//         event_date: 123456789,
//       },
//     ],
//     destination: {
//       name: 'Jim Wanjogu',
//       phone_number: '+254723333444',
//       delivery_location: {
//         description: 'Garden City, Thika Road, Nairobi',
//         longitude: 12.34534535,
//         latitude: 34.12323343,
//       },
//       house_location: 'House 3R ,4th Floor, Airpods Apartments',
//       delivery_instructions: 'Leave at the door',
//     },
//   },
//   error: [],
// };

// describe('Rating component', () => {
//   beforeEach(() => {
//     getters = {
//       getData: () => orderData,
//     };
//     store = new Vuex.Store({
//       getters,
//     });
//     wrapper = shallowMount(Rating, { store, localVue });
//   });
//   it('check the correct seller name is displayed incase of issues with items ', () => {
//     expect(wrapper.vm.seller_name).to.equal('Carols Store');
//   });
//   it('switch ratings based on rating value', async () => {
//     console.log('passed');
//   });
// });
