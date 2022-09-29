<template lang="">
  <div class="payments-on-delivery-container">
    <PayLaterCard v-if="showMakePaymentsCard" :totalAmount="this.totalAmount" />
    <PayNowCard v-if="showPayNowCard" :totalAmount="this.totalAmount" />
    <PaidCard v-if="getPaymentSuccessful === true" :totalAmount="this.totalAmount" />
    <Checkout />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Checkout from './checkout.vue';
import statusMixin from '../../../mixins/status_mixin';
import PayLaterCard from './payLaterCard.vue';
import PayNowCard from './payNowCard.vue';
import PaidCard from './paidCard.vue';

export default {
  name: 'PaymentsCard',
  components: {
    Checkout,
    PayLaterCard,
    PayNowCard,
    PaidCard,
  },
  data() {
    return {};
  },
  mixins: [statusMixin],
  computed: {
    ...mapGetters(['getData', 'getDeliveryStatus', 'getPaymentSuccessful']),
    showMakePaymentsCard() {
      return (
        this.getData.data.sale_of_goods_invoice !== null
        && this.getStatus([0, 1, 2, 3, 4, 5, 6, 7, 13]).includes(this.getDeliveryStatus)
        && this.getPaymentSuccessful === false
      );
    },
    showPayNowCard() {
      return (
        this.getData.data.sale_of_goods_invoice !== null
        && this.getStatus([8]).includes(this.getDeliveryStatus)
        && this.getPaymentSuccessful === false
      );
    },
    totalAmount() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.amount_to_charge
        : 0;
    },
  },
};
</script>
<style>
.payments-on-delivery-container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
}
.payments-on-delivery-title {
  color: #9b101c;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}
.pay-now-delivery-title {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
}
.payments-on-delivery-amount {
  color: #000000;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
}
.payments-on-delivery-text {
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.005em;
  color: #000000;
}
.payments-on-delivery-button a,
i {
  color: #324ba8 !important;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  text-decoration: none;
}
.payments-on-delivery-arrow-icon {
  font-weight: 600 !important;
}
.paid-sucessful-text {
  line-height: 10px;
}
</style>
