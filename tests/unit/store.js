/* eslint-disable */
import { createStore } from 'vuex'
import storeMutations from '../../src/store/mutations';
import storeActions from '../../src/store/actions';

let getters;
let actions;
let mutations;
const detailsDialogVisible = false;
const orderData = {
  message: 'order.retrieve.success',
  data: {
    seller_name: 'Carols Store',
    consolidated: false,
    order_status: 'event.delivery.order.created',
    order_completion_date: 123456789,
    scheduled_delivery_date: 123456789,
    estimated_delivery_date: 123456789,
    confirmation_pin: 2345,
    partner_contact_information: {},
    products: [
      {
        product_name: 'Pen',
        product_variant_description: 'Blue',
        product_unit_price: 20,
        product_unit_price_currency: 'KES',
        product_unit_count: 1,
        product_image_link:
            'https://s3.eu-west-1.amazonaws.com/sendy-partner-docs/fulfillment_products/B-XTC-2669_1634466113428_image_picker_DB31D551-4BE6-40A3-985C-97D31E6DC4B0-1173-000000F648645A2F.jpg',
      },
    ],
    event_time_line: [
      {
        event_code: 'event.delivery.order.created',
        event_date: 123456789,
      },
    ],
    destination: {
      name: 'Jim Wanjogu',
      phone_number: '+254723333444',
      delivery_location: {
        description: 'Garden City, Thika Road, Nairobi',
        longitude: 12.34534535,
        latitude: 34.12323343,
      },
      house_location: 'House 3R ,4th Floor, Airpods Apartments',
      delivery_instructions: 'Leave at the door',
    },
  },
  error: [],
};
const country = {
  countryCode: 'KE'
};

getters = {
  getData: () => orderData,
  getCountryData: () => country,
  getOrderStatuses: () => [
    'event.delivery.order.created',
    'event.delivery.at.hub.processing.for.delivery',
    'event.delivery.at.hub.partner.assigned',
    'event.delivery.at.hub.waiting.for.partner',
    'event.delivery.partner.enroute.to.hub',
    'event.delivery.partner.arrived.at.hub',
    'event.delivery.partner.pickup.from.hub.confirmed.via.code',
    'event.delivery.partner.enroute.to.buyer.location',
    'event.delivery.partner.arrived.at.buyer.location',
    'event.delivery.partner.submitted.items.to.buyer.confirmed.via.code',
    'event.delivery.order.canceled.by.seller',
  ],
  getDetailsDialogVisible: () => detailsDialogVisible,
  getDatePickerVisible: () => true,
};
actions = {
  requestAxiosPost: storeActions.requestAxiosPost,
  requestAxiosGet: storeActions.requestAxiosGet,
  requestAxiosPut: storeActions.requestAxiosPut,
  requestAxiosPatch: storeActions.requestAxiosPatch,
  updateDeliveryInformation: storeActions.updateDeliveryInformation,
  rateOrder: storeActions.rateOrder,
};
mutations = {
  setData: storeMutations.setData,
  setMobile: storeMutations.setMobile,
  setDialogVisible: storeMutations.setDialogVisible,
  setLoading: storeMutations.setLoading,
  setDatePickerVisible: storeMutations.setDatePickerVisible,
  setDeliveryStatus: storeMutations.setDeliveryStatus,
  setTimelineVisible: storeMutations.setTimelineVisible,
  setRecipientVisible: storeMutations.setRecipientVisible,
  setDetailsDialogVisible: storeMutations.setDetailsDialogVisible,
  setUpdateDelivery: storeMutations.setUpdateDelivery,
  setRateOrder: storeMutations.setRateOrder,
  setLanguage: storeMutations.setLanguage,
};
const store = createStore({
  getters,
  actions,
  mutations,
})
export default store;
