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
        'event.delivery.partner.submitted.items.to.buyer',
        'event.delivery.order.canceled.by.seller',
      ],
    };
  },
  actions,
  getters,
  mutations,
});
