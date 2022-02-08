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
      language: 'en',
      countryData: {
        countryCode: 'KE',
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
      ],
      orderTimelines: [
        {
          event: 'event.delivery.order.created',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#324ba8', '', ''],
          icons: ['el-icon-check', 'el-icon-minus', '', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 20, 7, 8],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.at.hub.processing.for.delivery',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#324ba8', '', ''],
          icons: ['el-icon-check', 'el-icon-minus', '', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 20, 7, 8],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.at.hub.partner.assigned',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'today',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 21, 7, 17],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.at.hub.waiting.for.partner',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'today',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 21, 7, 17],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.partner.enroute.to.hub',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'today',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 21, 7, 17],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.partner.arrived.at.hub',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'today',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 21, 7, 17],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.partner.pickup.from.hub.confirmed.via.code',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'today',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 21, 7, 17],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.partner.enroute.to.buyer.location',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, true, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'today',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 21, 22, 17],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.partner.arrived.at.buyer.location',
          steps: [0, 1, 8, 9],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, true, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'today',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 21, 12, 18],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.partner.submitted.items.to.buyer.confirmed.via.code',
          steps: [0, 1, 7, 9],
          colors: ['#EE7D00', '#EE7D00', '#EE7D00', '#EE7D00'],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-check', 'el-icon-check'],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'completed',
            status: true,
            format: 'ddd, MMM Do',
          }],
          titles: [0, 21, 13, 19],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.order.canceled.by.seller',
          steps: [0, 10],
          colors: ['#EE7D00', '#EE7D00'],
          icons: ['el-icon-check', 'el-icon-check'],
          showDriver: [false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          {
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          }],
          titles: [0, 16],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.order.canceled.by.sendy',
          steps: [0, 11],
          colors: ['#EE7D00', '#EE7D00'],
          icons: ['el-icon-check', 'el-icon-check'],
          showDriver: [false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          {
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          }],
          titles: [0, 16],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.failed',
          steps: [0, 1, 7, 12, 9],
          colors: ['#EE7D00', '#EE7D00', '#EE7D00', '#9B101C', '#909399'],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-check', 'el-icon-remove', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          ],
          titles: [0, 21, 8, 26, 18],
          showReschedule: [false, false, false, true, false],
        },
        {
          event: 'event.delivery.rescheduled.by.buyer',
          steps: [0, 13, 1, 7, 9],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', '', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', '', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          { status: false },
          ],
          titles: [0, 23, 1, 7, 18],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.rescheduled.by.seller',
          steps: [0, 14, 1, 7, 9],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', '', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', '', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          { status: false },
          ],
          titles: [0, 24, 1, 7, 18],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.rescheduled.by.sendy',
          steps: [0, 15, 1, 7, 9],
          colors: ['#EE7D00', '#EE7D00', '#324ba8', '', ''],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-minus', '', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          { status: false },
          ],
          titles: [0, 25, 1, 7, 18],
          showReschedule: [false, false, false, false, false],
        },
      ],
      rescheduledOrderTimelines: [
        {
          event: 'event.delivery.order.created',
          steps: [0, 1, 7, 8],
          colors: ['#EE7D00', '#324ba8', '', ''],
          icons: ['el-icon-check', 'el-icon-minus', '', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'dddd',
          }],
          titles: [0, 20, 7, 8],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.at.hub.processing.for.delivery',
          steps: [0, 12, 13, 1, 8],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          ],
          titles: [0, 27, 23, 20, 17],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.at.hub.partner.assigned',
          steps: [0, 12, 13, 7, 8],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          ],
          titles: [0, 27, 23, 7, 17],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.at.hub.waiting.for.partner',
          steps: [0, 12, 13, 7, 8],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          ],
          titles: [0, 27, 23, 7, 17],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.partner.enroute.to.hub',
          steps: [0, 12, 13, 7, 8],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          ],
          titles: [0, 27, 23, 7, 17],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.partner.arrived.at.hub',
          steps: [0, 12, 13, 7, 8],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          ],
          titles: [0, 27, 23, 7, 17],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.partner.pickup.from.hub.confirmed.via.code',
          steps: [0, 12, 13, 7, 8],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          ],
          titles: [0, 27, 23, 7, 17],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.partner.enroute.to.buyer.location',
          steps: [0, 12, 13, 7, 8],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          ],
          titles: [0, 27, 23, 7, 17],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.partner.arrived.at.buyer.location',
          steps: [0, 12, 13, 8, 9],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#324ba8', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-minus', ''],
          showDriver: [false, false, false, true, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          ],
          titles: [0, 27, 23, 12, 18],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.partner.submitted.items.to.buyer.confirmed.via.code',
          steps: [0, 12, 13, 7, 9],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', '#EE7D00', '#EE7D00'],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', 'el-icon-check', 'el-icon-check'],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'completed',
            status: true,
            format: 'ddd, MMM Do',
          },
          ],
          titles: [0, 27, 23, 7, 19],
          showReschedule: [false, false, false, false, false],
        },
        {
          event: 'event.delivery.order.canceled.by.seller',
          steps: [0, 10],
          colors: ['#EE7D00', '#EE7D00'],
          icons: ['el-icon-check', 'el-icon-check'],
          showDriver: [false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          {
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          }],
          titles: [0, 16],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.order.canceled.by.sendy',
          steps: [0, 11],
          colors: ['#EE7D00', '#EE7D00'],
          icons: ['el-icon-check', 'el-icon-check'],
          showDriver: [false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          {
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          }],
          titles: [0, 16],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.failed',
          steps: [0, 1, 7, 12, 9],
          colors: ['#EE7D00', '#EE7D00', '#EE7D00', '#9B101C', '#909399'],
          icons: ['el-icon-check', 'el-icon-check', 'el-icon-check', 'el-icon-remove', ''],
          showDriver: [false, false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          { status: false },
          {
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          ],
          titles: [0, 21, 8, 26, 18],
          showReschedule: [false, false, false, true, false],
        },
        {
          event: 'event.delivery.rescheduled.by.buyer',
          steps: [0, 12, 13, 9],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          ],
          titles: [0, 27, 23, 18],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.rescheduled.by.seller',
          steps: [0, 12, 14, 9],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          ],
          titles: [0, 27, 24, 18],
          showReschedule: [false, false, false, false],
        },
        {
          event: 'event.delivery.rescheduled.by.sendy',
          steps: [0, 12, 15, 9],
          colors: ['#EE7D00', '#9B101C', '#EE7D00', ''],
          icons: ['el-icon-check', 'el-icon-warning', 'el-icon-check', ''],
          showDriver: [false, false, false, false],
          dates: [{
            type: 'timeline',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          {
            type: 'scheduled',
            status: true,
            format: 'ddd, MMM Do',
          },
          { status: false },
          ],
          titles: [0, 27, 25, 18],
          showReschedule: [false, false, false, false],
        },
      ],
    };
  },
  actions,
  getters,
  mutations,
});
