<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template lang="">
  <div :class="!this.getMobile ? 'desktop-payments-container' : ''">
    <PayLaterCard
      v-if="showMakePaymentsCard"
      :totalAmount="this.totalAmount"
      :currency="this.currency"
    />
    <PayNowCard v-if="showPayNowCard" :totalAmount="this.totalAmount" :currency="this.currency" />
    <PaidCard v-if="showPaidCard" :totalAmount="this.invoincedAmount" :currency="this.currency" />
    <CheckoutCard />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import CheckoutCard from './checkout.vue';
import statusMixin from '../../../mixins/status_mixin';
import PayLaterCard from './payLaterCard.vue';
import PayNowCard from './payNowCard.vue';
import PaidCard from './paidCard.vue';

export default {
  name: 'PaymentsCard',
  components: {
    CheckoutCard,
    PayLaterCard,
    PayNowCard,
    PaidCard,
  },
  data() {
    return {};
  },
  mixins: [statusMixin],
  computed: {
    ...mapGetters(['getData', 'getDeliveryStatus', 'getPaymentSuccessful', 'getMobile']),
    showMakePaymentsCard() {
      return (
        this.getData.data.sale_of_goods_invoice !== null
        && this.getStatus([0, 1, 2, 3, 4, 5, 6, 7, 13]).includes(this.getDeliveryStatus)
        && this.getData.data.sale_of_goods_invoice.invoice_status !== 'INVOICE_COMPLETELY_PAID'
      );
    },
    showPayNowCard() {
      return (
        this.getData.data.sale_of_goods_invoice !== null
        && this.getStatus([8]).includes(this.getDeliveryStatus)
        && this.getData.data.sale_of_goods_invoice.invoice_status !== 'INVOICE_COMPLETELY_PAID'
      );
    },
    showPaidCard() {
      return this.getData.data.sale_of_goods_invoice.invoice_status === 'INVOICE_COMPLETELY_PAID';
    },
    totalAmount() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.amount_to_charge
        : 0;
    },
    invoincedAmount() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.invoiced_amount
        : 0;
    },
    currency() {
      return this.getData.data.sale_of_goods_invoice.currency;
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
  border: 1px solid #c0c4cc;
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
  text-transform: uppercase;
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
.payments-on-delivery-button p,
.payments-on-delivery-button a,
.el-icon-right {
  color: #324ba8 !important;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  text-decoration: none;
}
/* .view-receipt {
  margin-left: 25px;
} */
.payments-on-delivery-arrow-icon {
  font-weight: 600 !important;
  padding-top: 5px;
  font-size: 20px;
  margin-left: 5px;
}
.el-icon-right {
  padding-top: 30px;
}
</style>
