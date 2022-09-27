<template lang="">
  <div class="payments-on-delivery-container">
    <div class="" v-if="showMakePaymentsCard">
      <h1 class="payments-on-delivery-title">
        Pay for your delivery
      </h1>
      <p class="payments-on-delivery-amount">KES 700</p>
      <p class="payments-on-delivery-text">
        You can pay now or prepare to pay when your items arrive
      </p>
      <span class="payments-on-delivery-button" v-if="!showPayNowCard">
        <a class="" @click="showCheckoutModal">Make Payment</a>
        <i class="el-icon-right payments-on-delivery-arrow-icon ml-1"></i>
      </span>
    </div>
    <div v-if="showPayNowCard">
      <h1 class="pay-now-delivery-title">
        Pay for your delivery
      </h1>
      <p class="payments-on-delivery-amount">KES 700</p>
      <p class="payments-on-delivery-text">
        Your items arrive have arrived
      </p>
      <span class="payments-on-delivery-button">
        <el-button class="change-delivery-el-button">
          Pay Now
        </el-button>
      </span>
    </div>
    <Checkout />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import Checkout from './checkout.vue';
import statusMixin from '../../../mixins/status_mixin';

export default {
  name: 'PaymentsCard',
  components: { Checkout },
  data() {
    return {};
  },
  mixins: [statusMixin],
  computed: {
    ...mapGetters(['getData', 'getDeliveryStatus']),
    showMakePaymentsCard() {
      return (
        this.getData.data.sale_of_goods_invoice === null
        && this.getStatus([0, 1, 2, 3, 4, 5, 6, 7]).includes(this.getDeliveryStatus)
      );
    },
    showPayNowCard() {
      return (
        this.getData.data.sale_of_goods_invoice === null
        && this.getStatus([8]).includes(this.getDeliveryStatus)
      );
    },
  },
  methods: {
    ...mapMutations(['setCheckoutDialogVisible']),
    showCheckoutModal() {
      this.setCheckoutDialogVisible(true);
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
</style>
