<template lang="">
  <div>
    <el-dialog
      :visible.sync="checkoutDialogStatus"
      :width="getMobile ? '100%' : '30%'"
      :fullscreen="getMobile ? true : false"
      :show-close="getMobile ? true : false"
      center
      :close-on-click-modal="true"
    >
      <div class="payment-checkout-header">
        <h5>Checkout</h5>
        <p>Price breakdown</p>
      </div>
      <div>
        <div class="row">
          <div class="col-3">
            <p class="checkout-product-quantity">1111</p>
          </div>
          <div class="col-5">
            <p class="checkout-product-name">espresso coffee cofeeeeee</p>
          </div>
          <div class="col-4">
            <span class="checkout-product-price d-flex">
              <p>KES</p>
              <p class="pl-2">10000</p>
            </span>
          </div>
        </div>
        <hr class="price-breakdown-divider" />
      </div>
      <div class="payment-amount-summary-container">
        <span class="checkout-subtotal">
          <p>SubTotal</p>
          <p>KES 2000</p>
        </span>
        <span class="checkout-delivery-fee">
          <p>Delivery Fee</p>
          <p>KES 30</p>
        </span>
        <hr class="price-breakdown-divider" />
      </div>
      <span class="checkout-total-amount">
        <p>Total</p>
        <p>KES 3200</p>
      </span>
      <div class="d-grid gap-2 col-12 mx-auto">
        <el-button class="change-delivery-el-button">
          Continue to Pay
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Checkout',
  computed: {
    ...mapGetters(['getMobile', 'getCheckoutDialogVisible']),
    checkoutDialogStatus: {
      get() {
        return this.getCheckoutDialogVisible;
      },
      set(val) {
        return this.setCheckoutDialogVisible(val);
      },
    },
  },
  methods: {
    ...mapMutations(['setCheckoutDialogVisible']),
  },
};
</script>
<style>
/* .price-breakdown-container {
  display: flex;
  flex-direction: row;
  padding-top: 16px;
  justify-content: flex-start;
} */
.checkout-product-quantity {
  border: 1px solid #f0f3f7;
  padding: 2px 9px;
  background: #f0f3f7;
  width: fit-content;
}
.checkout-product-name,
.checkout-product-price {
  color: #303133;
  text-transform: capitalize;
  font-weight: 400;
}
.price-breakdown-divider {
  margin: 0 !important;
}
.payment-checkout-header {
  margin-top: -35px;
}
/* .el-dialog--center  {
    text-align: left !important;
}
*/
.el-dialog__close {
  font-size: 20px !important;
  color: #000000 !important;
  font-weight: 600 !important;
}
.checkout-subtotal,
.checkout-delivery-fee,
.checkout-total-amount {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.payment-amount-summary-container {
  padding-top: 15px;
  line-height: 20px;
}
.checkout-subtotal p,
.checkout-delivery-fee p {
  color: #303133;
}
.checkout-total-amount p {
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #303133;
}
.checkout-total-amount {
  margin-top: 16px;
}
.payment-checkout-header h5 {
  color: #000000;
  font-size: 20px;
}
.checkout-product-price {
  float: right !important;
}
</style>
