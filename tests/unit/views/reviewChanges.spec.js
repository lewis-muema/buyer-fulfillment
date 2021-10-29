/* eslint-disable */
// import Vuex from 'vuex';
// import { expect } from 'chai';
// import ElementUI from 'element-ui';
// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import ReviewChanges from '../../../src/views/fulfillment/reviewChanges.vue';

// const localVue = createLocalVue();

// localVue.use(Vuex);
// localVue.use(ElementUI);

// let store;
// let actions;
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

// describe('review changes component', () => {
//   beforeEach(() => {
//     actions = {
//       updateDeliveryInformation: () => orderData,
//     };
//     store = new Vuex.Store({
//       actions,
//     });
//     wrapper = shallowMount(ReviewChanges, {
//       store,
//       localVue,
//       propsData: {
//         dialogVisible: true,
//         name: 'Jim Wanjogu',
//         phone: '+254723333444',
//         deliveryLocationDescription: 'Garden City, Thika Road, Nairobi',
//         deliveryLocationLongitude: '12.34534535',
//         deliveryLocationLatitude: '34.12323343',
//         houseLocation: 'House 3R ,4th Floor, Airpods Apartments',
//         deliveryOption: 'Leave at the door',
//       },
//     });
//   });
//   it('should render member props in the component', () => {
//     expect(wrapper.props().name).to.equal('Jim Wanjogu');
//     expect(wrapper.props().phone).to.equal('+254723333444');
//     expect(wrapper.props().deliveryLocationDescription).to.equal('Garden City, Thika Road, Nairobi');
//     expect(wrapper.props().deliveryLocationLongitude).to.equal('12.34534535');
//     expect(wrapper.props().deliveryLocationLatitude).to.equal('34.12323343');
//     expect(wrapper.props().houseLocation).to.equal('House 3R ,4th Floor, Airpods Apartments');
//     expect(wrapper.props().deliveryOption).to.equal('Leave at the door');
//   });
// });
