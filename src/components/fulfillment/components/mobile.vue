<template>
  <div>
    <Header />
    <OrderedItemsHeader />
    <ExpectedDelivery />
    <DeliveryPin />
    <ItemDelivered />
    <OrderCanceled />
    <RescheduleOrderButton />
    <changeinfo />
    <Rating v-if="getStatus([9]).includes($store.getters.getDeliveryStatus)" />
    <PaymentsCard />
    <Timeline v-if="showTimeline"/>
    <Recipient />
  </div>
</template>

<script>
import Header from '../../../views/fulfillment/header.vue';
import Timeline from '../../../views/fulfillment/timeline/timelineV2.vue';
import Recipient from '../../../views/fulfillment/recipient.vue';
import Rating from '../../../views/fulfillment/rating.vue';
import changeinfo from '../../../views/fulfillment/changeInfo/changeInfo.vue';
import statusMixin from '../../../mixins/status_mixin';
import PaymentsCard from '../../../views/fulfillment/POD/paymentsCard.vue';
import OrderedItemsHeader from '../../../views/fulfillment/orderedItems/orderedItemsHeader.vue';
import ExpectedDelivery from '../../../views/fulfillment/deliveryTimelines/expectedDelivery.vue';
import DeliveryPin from '../../../views/fulfillment/deliveryTimelines/deliveryPin.vue';
import ItemDelivered from '../../../views/fulfillment/deliveryTimelines/itemDelivered.vue';
import OrderCanceled from '../../../views/fulfillment/deliveryTimelines/orderCanceled.vue';
import RescheduleOrderButton from '../../../views/fulfillment/deliveryTimelines/rescheduleOrderButton.vue';

export default {
  components: {
    Header,
    Timeline,
    Recipient,
    Rating,
    changeinfo,
    PaymentsCard,
    OrderedItemsHeader,
    ExpectedDelivery,
    DeliveryPin,
    ItemDelivered,
    OrderCanceled,
    RescheduleOrderButton,
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
.fulfillemnt-order-items-header {
  text-transform: capitalize;
}
.change-delivery-el-button {
  margin: 0px 0px 20px !important;
}
.show-datepicker-el-button {
  margin: 0px 0px 20px !important;
  max-width: fit-content;
}
.el-timeline {
  padding-right: 40px;
}
.order-number {
  font-weight: 600;
}
</style>
