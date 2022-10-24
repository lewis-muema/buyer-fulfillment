<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template lang="">
  <div class="payments-on-delivery-container">
    <div class="" v-if="getMobile">
      <h1 class="payments-on-delivery-title">Pay for your delivery</h1>
      <p class="payments-on-delivery-amount">
        <span> {{ currency }}</span>
        {{ totalAmount }}
      </p>
      <p class="payments-on-delivery-text">
        You can pay now or prepare to pay when your items arrive
      </p>
      <span class="payments-on-delivery-button d-flex">
        <p class="" @click="showCheckoutModal">Make Payment</p>
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
          <p class="desktop-pay-text">Pay {{ currency }} {{ totalAmount }} delivery.</p>
          <p>You can pay now or prepare to pay when your items arrive.</p>
        </div>
        </div>
        <div class="make-payment-button-container">
          <el-button @click="showCheckoutModal" class="make-payment-button">
            Make Payment
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
  padding: 18px 12px !important
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
