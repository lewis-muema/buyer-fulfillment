<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template lang="">
  <div class="payments-on-delivery-container">
    <div class="">
      <h1 class="payments-on-delivery-title">
        Pay for your delivery
      </h1>
      <p class="payments-on-delivery-amount">
        <span> {{ getData.data.sale_of_goods_invoice.currency }}</span>
        {{ totalAmount }}
      </p>
      <p class="payments-on-delivery-text">
        You can pay now or prepare to pay when your items arrive
      </p>
      <span class="payments-on-delivery-button d-flex">
        <p class="" @click="showCheckoutModal">Make Payment</p>
        <el-icon class='payments-on-delivery-arrow-icon ml-5'>
        <Right class='el-icon-right' /></el-icon>
      </span>
    </div>
  </div>
</template>
<script>
import { Right } from '@element-plus/icons';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'PayLaterCard',
  props: ['totalAmount'],
  components: { Right },
  computed: {
    ...mapGetters(['getData']),
  },
  methods: {
    ...mapMutations(['setCheckoutDialogVisible', 'setCheckoutModal']),
    showCheckoutModal() {
      this.setCheckoutDialogVisible(true);
      localStorage.setItem('CheckoutModal', 'Checkout');
    },
  },
};
</script>
<style lang=""></style>
