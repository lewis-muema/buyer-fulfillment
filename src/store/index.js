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
      ratingVisible: true,
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
        'Your order has been created and is being processed',
        'Your order is being processed',
        'A partner has been assigned to your order',
        'We are waiting for your partner to collect your order',
        'The partner is on the way to pickup your order',
        'The partner has arrived at the hub',
        'Your package has been collected',
        'The partner is on the way to deliver your package',
        'The partner has arrived at your location',
        'Your delivery is complete',
        'Your order has been cancelled by the seller',
      ],
    };
  },
  actions,
  getters,
  mutations,
});
