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
      data: {},
      mobile: false,
      dialogVisible: false,
      detailsDialogVisible: false,
      loading: false,
      timelineVisible: true,
      recipientVisible: true,
      datePickerVisible: false,
      deliveryStatus: 0,
      updateDelivery: null,
      rateOrder: null,
      orderStatuses: [
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
      orderEvents: [
        'A Sendy fulfilment order has been created on your behalf',
        'Your order is being processed',
        'We have found a partner to deliver your order.',
        'We are waiting for your partner to deliver your order',
        'The partner is enroute to collect your order',
        'The partner has arrived at the pickup location for your order',
        'The partner has picked your package for delivery',
        'The partner is in transit to your location',
        'The partner has arrived at your location and is ready to submit your package, Please share the code for the order to be completed.',
        'The partner has submitted your package.',
        'Your order has been cancelled by the seller',
      ],
    };
  },
  actions,
  getters,
  mutations,
});
