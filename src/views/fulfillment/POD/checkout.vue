<template lang="">
  <div class="checkout-dialog-container">
    <el-dialog
      :visible.sync="checkoutDialogStatus"
      :width="getMobile ? '100%' : '30%'"
      :fullscreen="getMobile ? true : false"
      :show-close="getMobile ? true : false"
      center
      :close-on-click-modal="true"
    >
      <div class="payment-checkout-header">
        <h5>{{getCheckoutModal === 'checkout' ? 'Checkout' : 'Receipt'}}</h5>
        <p v-if="getCheckoutModal === 'checkout'">Price breakdown</p>
      </div>
      <div v-if="getCheckoutModal === 'receipt'" >
        <span>Amount Paid&nbsp;</span>
        <span>Kes 3200</span>
        <p>Sept 13, 2022 13:23</p>
      </div>
      <div>
        <div class="row" v-for="(product, index) in products" :key="index">
          <div class="col-3">
            <p class="checkout-product-quantity">{{ product.product_unit_count }}</p>
          </div>
          <div class="col-5">
            <p class="checkout-product-name">{{ product.product_name }}</p>
          </div>
          <div class="col-4">
            <span class="checkout-product-price d-flex">
              <p>{{ product.product_unit_currency }}</p>
              <p class="pl-2">{{ product.product_unit_price }}</p>
            </span>
          </div>
        </div>
        <hr class="price-breakdown-divider" />
      </div>
      <div class="payment-amount-summary-container">
        <span class="checkout-subtotal">
          <p>SubTotal</p>
          <p>
            {{ currency }}
            {{ subtotal }}
          </p>
        </span>
        <span class="checkout-delivery-fee">
          <p>Delivery Fee</p>
          <p>
            {{ currency }}
            {{ fulfillmentFee }}
          </p>
        </span>
        <hr class="price-breakdown-divider" />
      </div>
      <span class="checkout-total-amount">
        <p>Total</p>
        <p>{{ currency }} {{ totalAmount }}</p>
      </span>
      <div class="d-grid gap-2 col-12 mx-auto" v-if="getCheckoutModal === 'checkout'">
        <el-button class="change-delivery-el-button" @click="submitToPay">
          Continue to Pay
        </el-button>
      </div>
      <div v-if="getCheckoutModal === 'receipt'">
        <p>Payment details</p>
        <div class="lineHeight">
          <p>Mpesa</p>
        <p>0794375045</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Checkout',
  props: ['name'],
  computed: {
    ...mapGetters(['getMobile', 'getCheckoutDialogVisible', 'getData', 'getCheckoutModal']),
    checkoutDialogStatus: {
      get() {
        return this.getCheckoutDialogVisible;
      },
      set(val) {
        return this.setCheckoutDialogVisible(val);
      },
    },
    products() {
      return this.getData.data.products;
    },
    subtotal() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.invoice_adjustments_subtotals[1]
          .adjustment_subtotal
        : 0;
    },
    currency() {
      return this.getData.data.sale_of_goods_invoice.currency;
    },
    fulfillmentFee() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.invoice_adjustments_subtotals[0]
          .adjustment_subtotal
        : 0;
    },
    totalAmount() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.amount_to_charge
        : 0;
    },
  },
  methods: {
    ...mapMutations(['setCheckoutDialogVisible', 'setPaymentSuccessful', 'setCheckoutModal']),
    submitToPay() {
      this.setPaymentSuccessful(true);
      this.setCheckoutDialogVisible(false);
      this.setCheckoutModal('receipt');
    },
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
.checkout-dialog-container {
  overflow: scroll !important;
}
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
.lineHeight {
  line-height: 10px;
}
</style>
