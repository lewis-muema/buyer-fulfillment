import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state() {
    return {
      data: {
        code: 200,
        message: 'delivery.retrieved.success',
        data: {
          orderStatus: 'order.created.queued.for.processing',
          expectedDeliveryDate: {
            date: '2019-10-12T07:20:50.52z',
            deliveryWindow: {
              fromDate: '2019-9-12T07:20:50.52z',
              toDate: '2019-11-12T07:20:50.52z',
            },
          },
          confirmationPin: 2345,
          seller: 'Marina Products',
          returns: [
            {
              return_id: 'R_ASD123',
              date_created: 123456789,
              return_status: 'return.status.1',
              reasonForReturnTitle: 'return.reason.1',
              reasonForReturnDescription: 'string',
            },
          ],
          partnerContactInformation: {
            name: 'Jane Peterson',
            vendor_type: 'MotoBike',
            licensePlateNumber: 'KBN 123K',
            phone_number: '+254756123456',
          },
          products: [
            {
              product_name: 'Cermamic Cups',
              product_unit_price: 500,
              product_quantity: 50,
            },
          ],
          eventTimeline: [
            {
              message: 'Order received Mon, August 23rd',
              date_created: '2019-9-12T05:20:50.52z',
            },
            {
              message: 'We are preparing your order',
              date_created: '2019-9-12T07:20:50.52z',
            },
            {
              message: 'Your rider has arrived',
              date_created: '2019-9-12T09:20:50.52z',
            },
            {
              message: 'Delivery has been completed',
              date_created: '2019-9-12T11:20:50.52z',
            },
          ],
          recipientContactInformation: {
            customer_name: 'Jim Wanjogu',
            customer_phone_number: '+254723333444',
            customer_delivery_location: {
              description: 'Garden City, Thika Road, Nairobi',
              longitude: 12.34534535,
              latittude: 34.12323343,
            },
            house_location: 'House 3R ,4th Floor, Airpods Apartments',
            deliveryInstructions: 'Leave at the door',
          },
        },
      },
      mobile: false,
      dialogVisible: false,
      timelineVisible: true,
      datePickerVisible: false,
      deliveryStatus: 0,
    };
  },
  actions,
  getters,
  mutations,
});
