<template lang="">
  <div class="payments-on-delivery-container pay-now-container">
    <div>
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
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['totalAmount', 'currency'],
  computed: {
    ...mapGetters(['getData']),
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
