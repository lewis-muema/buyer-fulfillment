<template>
  <div>
    <TopHeader />
    <OrderedItemsHeader />
    <ExpectedDelivery />
    <DeliveryPin />
    <ItemDelivered />
    <OrderCanceled />
    <RescheduleOrderButton />
    <PaymentsCard />
    <RateOrder v-if="getStatus([9]).includes($store.getters.getDeliveryStatus)" />
    <TrackingTimelines  />
    <RecepientDetails />
  </div>
</template>

<script>
import TopHeader from '../../../views/fulfillment/header.vue';
import TrackingTimelines from '../../../views/fulfillment/timeline/timelines.vue';
import RecepientDetails from '../../../views/fulfillment/recipient/recipient.vue';
import RateOrder from '../../../views/fulfillment/rating/rating.vue';
import statusMixin from '../../../mixins/status_mixin';
import PaymentsCard from '../../../views/fulfillment/POD/paymentsCard.vue';
import OrderedItemsHeader from '../../../views/fulfillment/orderedItems/orderedItemsHeader.vue';
import ExpectedDelivery from '../../../views/fulfillment/deliveryTimelines/expectedDelivery.vue';
import DeliveryPin from '../../../views/fulfillment/deliveryTimelines/deliveryPin.vue';
import ItemDelivered from '../../../views/fulfillment/deliveryTimelines/itemDelivered.vue';
import OrderCanceled from '../../../views/fulfillment/deliveryTimelines/orderCanceled.vue';
import RescheduleOrderButton from '../../../views/fulfillment/deliveryTimelines/rescheduleOrderButton.vue';

export default {
  name: 'MobileLayout',
  components: {
    TopHeader,
    OrderedItemsHeader,
    ExpectedDelivery,
    DeliveryPin,
    ItemDelivered,
    OrderCanceled,
    RescheduleOrderButton,
    PaymentsCard,
    TrackingTimelines,
    RecepientDetails,
    RateOrder,
  },
  mixins: [statusMixin],
  data() {
    return {
      data: this.$store.getters.getData,
      showTimeline: true,
    };
  },
  mounted() {
    window.addEventListener('language-changed', () => {
      this.showTimeline = false;
      this.$nextTick().then(() => {
        this.showTimeline = true;
      });
    });
  },
  computed: {
    showTrackingTimeline() {
      return !this.getStatus([9]).includes(this.$store.getters.getDeliveryStatus)
      && this.showTimeline;
    },
  },
};
</script>

<style>
.delivered-title {
  margin: 15px 0px !important;
  font-weight: 600;
  font-size: 18px;
}
.delivered-date {
  font-weight: 600;
  font-size: 18px;
  color: #606266;
}
.rider-pin-mobile {
  letter-spacing: 0.25px;
  color: #ee7d00;
  font-weight: 700;
}
.change-details-title {
  color: #909399;
  font-size: 13px;
  margin: 5px 0px;
}
.change-delivery-el-button {
  margin: 0px 0px 20px !important;
}
.show-datepicker-el-button {
  margin: 0px 0px 20px !important;
  max-width: fit-content;
}
.order-number {
  font-weight: 600;
  font-size: 12px;
}
</style>
