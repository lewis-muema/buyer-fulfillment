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
      timelineVisible: false,
      recipientVisible: false,
      ratingVisible: true,
      ratingcardVisible: true,
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
      orderEvents: {
        'event.delivery.order.created': 'timeline.orderCreated',
        'event.delivery.at.hub.processing.for.delivery':
          'timeline.orderProcessed',
        'event.delivery.at.hub.waiting.for.partner':
          'timeline.partnerCollection',
        'event.delivery.at.hub.partner.assigned':
          'timeline.partnerAssigned',
        'event.delivery.partner.enroute.to.hub':
          'timeline.partnerPickup',
        'event.delivery.partner.arrived.at.hub':
          'timeline.partnerArrived',
        'event.delivery.partner.pickup.from.hub.confirmed.via.code':
          'timeline.packageCollected',
        'event.delivery.partner.enroute.to.buyer.location':
          'timeline.packageInTransit',
        'event.delivery.partner.arrived.at.buyer.location':
          'timeline.packageArrived',
        'event.delivery.buyer.paid.for.goods':
          'deliveries.theBuyerHasPaidForThePackage',
        'event.delivery.partner.submitted.items.to.buyer.confirmed.via.code':
          'timeline.deliveryCompletedDate',
        'event.delivery.failed': 'timeline.orderFailed',
        'event.delivery.order.canceled.by.seller':
          'timeline.orderCancelledBySeller',
        'event.delivery.order.canceled.by.sendy':
          'timeline.orderCancelledBySendy',
        'event.delivery.rescheduled.by.seller':
          'timeline.rescheduledBySeller',
        'event.delivery.rescheduled.by.sendy':
          'timeline.rescheduledBySendy',
        'event.delivery.rescheduled.by.buyer':
          'timeline.rescheduledByBuyer',
      },
    };
  },
  actions,
  getters,
  mutations,
});
