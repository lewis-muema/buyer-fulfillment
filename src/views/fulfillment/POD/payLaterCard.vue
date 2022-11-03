<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template lang="">
  <div :class="getMobile ? 'payments-on-delivery-container' : 'payments-on-delivery-containerr'">
    <div class="" v-if="getMobile">
      <h1 class="payments-on-delivery-title">{{$t("payments.payYourDelivery")}}</h1>
      <p class="payments-on-delivery-amount">
        <span> {{ currency }}</span>
        {{ totalAmount }}
      </p>
      <p class="payments-on-delivery-text">
        {{$t("payments.youCanPayNow")}}
      </p>
      <span class="payments-on-delivery-button d-flex">
        <p class="" @click="showCheckoutModal">{{$t("payments.makePayment")}}</p>
        <el-icon class="payments-on-delivery-arrow-icon ml-5">
          <Right class="el-icon-right"
        /></el-icon>
      </span>
    </div>
    <div v-else>
      <div>
        <div class="d-flex">
        <el-icon class="warning-filled-icon"><WarningFilled /></el-icon>
        <div class="paid-card-desc">
          <p class="desktop-pay-text">{{$t("payments.pay")}} {{ currency }}
          {{ totalAmount }} {{$t("payments.delivery")}}.</p>
          <p> {{$t("payments.youCanPayNow")}}.</p>
        </div>
        </div>
        <div class="make-payment-button-container">
          <el-button @click="showCheckoutModal" class="make-payment-button">
            {{$t("payments.makePayment")}}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Right, WarningFilled } from '@element-plus/icons';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'PayLaterCard',
  props: ['totalAmount', 'currency'],
  components: { Right, WarningFilled },
  computed: {
    ...mapGetters(['getData', 'getMobile']),
  },
  methods: {
    ...mapMutations(['setCheckoutDialogVisible', 'setCheckoutModal']),
    showCheckoutModal() {
      this.setCheckoutDialogVisible(true);
    },
  },
};
</script>
<style>
.make-payment-button {
  background: #9b101c !important;
  padding: 18px 12px !important;
  border-color: transparent !important;
}
.make-payment-button-container {
  float: right;
  margin-top: -60px;
}
.warning-filled-icon {
  color: #9B101C;
  width: 26px;
  height: 26px;
}
.desktop-pay-text {
  color: #9B101C;
  font-weight: 600;
}
</style>
