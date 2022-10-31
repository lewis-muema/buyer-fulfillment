<template lang="">
  <div>
    <div
      :class="
        getMobile
          ? 'fulfillemnt-order-items-expected-deivery'
          : 'fulfillemnt-order-items-expected-deivery-desktop'
      "
      v-if="showExpectedDeliveryCard"
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        {{ $t("mobile.expectedDelivery") }}
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        {{
          Object.keys(getData).length > 0 ? formatDate(getData.data.scheduled_delivery_date) : "--"
        }}
      </p>
      <p v-if="getData.data.estimated_delivery_date" class="date">
        {{ formatDeliveryWindow(getData.data.estimated_delivery_date) }}
      </p>
      <div>
        <div class="change-details-title">
          {{ $t("mobile.notIn") }}
        </div>
        <el-button @click="showDetailsPicker()" class="change-delivery-el-button">
          {{ $t("mobile.changeDetails") }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import statusMixin from '../../../mixins/status_mixin';
import formatDates from '../../../mixins/formatDate_mixin';

export default {
  name: 'ExpectedDelivery',
  mixins: [statusMixin, formatDates],
  computed: {
    ...mapGetters(['getData', 'getDeliveryStatus', 'getMobile']),
    showExpectedDeliveryCard() {
      let showExpectedDeliveryCard = false;
      const partnerArrived = (this.getData.data.event_time_line
        .map((e) => e.event_code)
        .indexOf('event.delivery.partner.arrived.at.buyer.location') > -1);
      const orderCancelled = this.getData.data.order_status === 'ORDER_CANCELED';
      const orderCompleted = this.getData.data.order_status === 'ORDER_COMPLETED';
      const orderFailed = this.getData.data.order_status === 'ORDER_FAILED';
      if (!partnerArrived && !orderCancelled && !orderCompleted && !orderFailed) {
        showExpectedDeliveryCard = true;
      }
      return showExpectedDeliveryCard;
    },
  },
  methods: {
    ...mapMutations(['setDetailsDialogVisible']),
    showDetailsPicker() {
      this.setDetailsDialogVisible(true);
    },
  },
};
</script>
<style>
.el-button {
  background: #324ba8 !important;
  color: white !important;
  padding: 22px 12px !important;
}
</style>
