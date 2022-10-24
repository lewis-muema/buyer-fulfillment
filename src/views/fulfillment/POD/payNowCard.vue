<template lang="">
  <div :class="getMobile ? 'payments-on-delivery-container pay-now-container' :
  'payments-on-delivery-container'">
    <div v-if="getMobile">
      <h1 class="pay-now-delivery-title">
        Pay for your delivery
      </h1>
      <p class="payments-on-delivery-amount">
        {{currency}} {{ totalAmount }}
      </p>
      <p class="payments-on-delivery-text">
        Your items have arrived
      </p>
      <span class="payments-on-delivery-button">
        <el-button class="pay-now-button" @click="showCheckoutModal">
          Pay Now
        </el-button>
      </span>
    </div>
    <div v-else>
      <div class="">
        <div class="d-flex">
        <el-icon class="warning-filled-icon"><WarningFilled /></el-icon>
        <div class="paid-card-desc">
          <p class="desktop-pay-text">Pay {{ currency }} {{ totalAmount }} delivery.</p>
          <p>Please pay now, your items have arrived.</p>
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
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['totalAmount', 'currency'],
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
  .pay-now-button {
    margin: 0 !important;
    width: 60% !important;
  }
  .pay-now-container {
    background: #F1F4FF !important
  }
</style>
