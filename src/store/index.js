import { createStore } from 'vuex';
import { shallowRef } from 'vue';
import { Check, Minus } from '@element-plus/icons';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default createStore({
  namespaced: true,
  state() {
    return {
      data: {},
      payOnDelivery: {},
      mobile: false,
      dialogVisible: false,
      detailsDialogVisible: false,
      loading: false,
      timelineVisible: true,
      recipientVisible: true,
      ratingVisible: true,
      datePickerVisible: false,
      checkoutDialogVisible: false,
      reviewDialogVisible: false,
      deliveryStatus: 0,
      updateDelivery: null,
      rateOrder: null,
      paymentSuccessful: false,
      checkoutModal: '',
      language: 'en',
      countryData: {
        countryCode: 'KE',
      },
      timelineIcons: {
        PAST: {
          icon: shallowRef(Check),
          color: '#EE7D00',
          iconClass: 'el-icon-check',
        },
        PRESENT: {
          icon: shallowRef(Minus),
          color: '#EE7D00',
          iconClass: 'el-icon-minuss',
        },
        FUTURE: {
          hollow: false,
        },
      },
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
        'event.delivery.order.canceled.by.sendy',
        'event.delivery.failed',
        'event.delivery.rescheduled.by.buyer',
        'event.delivery.rescheduled.by.seller',
        'event.delivery.rescheduled.by.sendy',
        'event.delivery.buyer.paid.for.goods',
      ],
      orderEvents: [
        'timeline.orderCreated',
        'timeline.orderProcessed',
        'timeline.partnerAssigned',
        'timeline.partnerCollection',
        'timeline.partnerPickup',
        'timeline.partnerArrived',
        'timeline.packageCollected',
        'timeline.packageInTransit',
        'timeline.packageArrived',
        'timeline.deliveryComplete',
        'timeline.orderCancelled',
        'timeline.orderFailed',
        'timeline.partnerIsHere',
        'timeline.partnerAtDestination',
        'timeline.deliveryAttempted',
        'timeline.delay',
        'timeline.orderCancelledDate',
        'timeline.arriving',
        'timeline.deliveryCompleted',
        'timeline.deliveryCompletedDate',
        'timeline.preparingDelivery',
        'timeline.preparedDelivery',
        'timeline.arrivingSoon',
        'timeline.rescheduledByBuyer',
        'timeline.rescheduledBySeller',
        'timeline.rescheduledBySendy',
        'timeline.attemptFailed',
        'timeline.attemptFail',
        'timeline.orderPlaced',
      ],

    };
  },
  actions,
  getters,
  mutations,
});
