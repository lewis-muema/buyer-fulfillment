<template lang="">
  <div>
    <div class="fulfillemnt-order-items-expected-deivery" v-if="showOTP">
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
    ...mapGetters(['getData', 'getDeliveryStatus', 'getPaymentSuccessful']),
    showOTP() {
      // if(this.getData.data.sale_of_goods_invoice !== null) {
      //   return localStorage.getItem('ItemPaid')
      // }
      return this.getData.data.sale_of_goods_invoice === null
        ? this.getStatus([8]).includes(this.getDeliveryStatus)
        : this.getStatus([8]).includes(this.getDeliveryStatus) && this.getData.data.sale_of_goods_invoice.invoice_status === 'INVOICE_COMPLETELY_PAID';
    },
  },
};
</script>
<style lang=""></style>
