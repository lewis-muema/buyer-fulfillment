<template lang="">
  <div :class="getMobile ? 'payments-on-delivery-container pay-now-container' :
  'payments-on-delivery-containerr'">
    <div v-if="getMobile">
      <h1 class="pay-now-delivery-title">
        {{$t("payments.payYourDelivery")}}
      </h1>
      <p class="payments-on-delivery-amount">
        {{currency}} {{ totalAmount }}
      </p>
      <p class="payments-on-delivery-text">
        {{$t("payments.itemsArrived")}}
      </p>
      <span class="payments-on-delivery-button">
        <el-button class="pay-now-button" @click="showCheckoutModal">
          {{$t("payments.payNow")}}
        </el-button>
      </span>
    </div>
    <div v-else>
      <div class="">
        <div class="d-flex">
        <el-icon class="warning-filled-icon"><WarningFilled /></el-icon>
        <div class="paid-card-desc">
          <p class="desktop-pay-text">{{$t("payments.pay")}}
            {{ currency }} {{ totalAmount }} {{$t("payments.delivery")}}.</p>
          <p>{{$t("payments.pleasePayNow")}}.</p>
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
import { WarningFilled } from '@element-plus/icons';
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['totalAmount', 'currency'],
  components: { WarningFilled },
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
