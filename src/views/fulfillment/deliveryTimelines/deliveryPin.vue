<template lang="">
  <div>
    <div :class="getMobile ? 'fulfillemnt-order-items-expected-deivery' :
    'desktop-delivery-pin-container'" v-if="showOTP">
      <p class="fulfillemnt-order-items-expected-deivery-title">
        {{ $t("desktop.givePin") }}
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        <span class="rider-pin-mobile">
          {{ $t("mobile.pin") }}
          {{ Object.keys(getData).length > 0 ? getData.data.confirmation_pin : "--" }}
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import statusMixin from '../../../mixins/status_mixin';

export default {
  mixins: [statusMixin],
  name: 'DeliveryPin',
  computed: {
    ...mapGetters(['getData', 'getDeliveryStatus', 'getPaymentSuccessful', 'getMobile']),
    showOTP() {
      const partnerArrived = (this.getData.data.event_time_line
        .map((e) => e.event_code)
        .indexOf('event.delivery.partner.arrived.at.buyer.location') > -1);
      let outcome = false;
      const orderCompleted = (this.getData.data.order_status === 'ORDER_COMPLETED');
      if (!orderCompleted && partnerArrived) {
        if (this.getData.data.sale_of_goods_invoice === null) {
          outcome = true;
        } else if ((this.getData.data.sale_of_goods_invoice !== null) && (this.getData.data.sale_of_goods_invoice.invoice_status === 'INVOICE_COMPLETELY_PAID')) {
          outcome = true;
        } else {
          outcome = false;
        }
      }
      return outcome;
    },

  },
};
</script>
<style>
.desktop-delivery-pin-container {
  margin: 0 !important;
}
</style>
