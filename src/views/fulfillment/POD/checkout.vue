<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template lang="">
  <div class="checkout-dialog-container">
    <el-dialog
      v-model="checkoutDialogStatus"
      :width="getMobile ? '100%' : '30%'"
      :fullscreen="getMobile ? true : false"
      :show-close="false"
      center
      :close-on-click-modal="true"
    >
      <div>
        <div @click="closeCheckoutModal">
          <el-icon class="payment-checkout-header-icon"><Back /></el-icon>
        </div>
        <div class="text-desc">
          <h5>{{ showCheckoutModal ? "Checkout" : "Receipt" }}</h5>
          <p v-if="showCheckoutModal">Price breakdown</p>
        </div>
      </div>
      <div v-if="showReceiptModal">
        <span>Amount Paid&nbsp;</span>
        <span> {{ currency }} {{ invoicedAmount }}</span>
        <p>Sept 13, 2022 13:23</p>
      </div>
      <div>
        <div
          class="row"
          v-for="(product, index) in products"
          :key="index"
        >
          <div></div>
          <div class="col-2">
            <p class="checkout-product-quantity">{{ product.adjustment_quantity }}</p>
          </div>
          <div class="col-7">
            <p class="checkout-product-name">{{ product.adjustment_description }}</p>
          </div>
          <div class="col-3">
            <span class="checkout-product-price d-flex">
              <p>{{ product.currency }}&nbsp;</p>
              <p class="pl-2">{{ product.adjustment_value }}</p>
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
        <p>{{ currency }} {{ showCheckoutModal ? totalAmount : invoicedAmount }}</p>
      </span>
      <div class="d-grid gap-2 col-12 mx-auto" v-if="showCheckoutModal">
        <el-button class="change-delivery-el-button" @click="submitToPay">
          Continue to Pay
        </el-button>
      </div>
      <div v-if="showReceiptModal">
        <p>Payment details</p>
        <div class="text-desc">
          <p>Mpesa</p>
          <p>0794375045</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { Back } from '@element-plus/icons';

export default {
  name: 'CheckoutCard',
  props: ['name'],
  components: { Back },
  computed: {
    ...mapGetters([
      'getMobile',
      'getCheckoutDialogVisible',
      'getData',
      'getCheckoutModal',
      'getSavedPayMethods',
    ]),
    checkoutDialogStatus: {
      get() {
        return this.getCheckoutDialogVisible;
      },
      set(val) {
        return this.setCheckoutDialogVisible(val);
      },
    },
    products() {
      return this.getData.data.sale_of_goods_invoice.invoice_adjustments.filter(
        (i) => i.adjustment_type === 'SALE_OF_GOOD',
      );
    },
    subtotal() {
      // eslint-disable-next-line
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.invoice_adjustments_subtotals.length > 1
          ? this.getData.data.sale_of_goods_invoice.invoice_adjustments_subtotals[1]
            .adjustment_subtotal
          : this.getData.data.sale_of_goods_invoice.invoice_adjustments_subtotals[0]
            .adjustment_subtotal
        : 0;
    },
    currency() {
      return this.getData.data.sale_of_goods_invoice.currency;
    },
    fulfillmentFee() {
      // eslint-disable-next-line
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.invoice_adjustments_subtotals.length > 1
          ? this.getData.data.sale_of_goods_invoice.invoice_adjustments_subtotals[0]
            .adjustment_subtotal
          : 0
        : 0;
    },
    totalAmount() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.amount_to_charge
        : 0;
    },
    invoicedAmount() {
      return this.getData.data.sale_of_goods_invoice !== null
        ? this.getData.data.sale_of_goods_invoice.invoiced_amount
        : 0;
    },
    showCheckoutModal() {
      return this.getData.data.sale_of_goods_invoice.invoice_status !== 'INVOICE_COMPLETELY_PAID';
    },
    showReceiptModal() {
      return this.getData.data.sale_of_goods_invoice.invoice_status === 'INVOICE_COMPLETELY_PAID';
    },
  },
  methods: {
    ...mapMutations(['setCheckoutDialogVisible', 'setPaymentSuccessful', 'setCheckoutModal']),
    ...mapActions(['payOnDelivery']),
    submitToPay() {
      try {
        const buPayload = {
          user_id: '',
          entity_id: 6,
          pay_direction: 'PAY_ON_DELIVERY',
          currency: this.currency,
          country_code: 'KE',
          amount: this.totalAmount,
          success_callback_url: '',
          fail_callback_url: '',
          txref: this.getData.data.order_id,
          bulk: false,
          paybill_no: '',
          email: '',
          authToken: '',
          firstname: this.getData.data.destination.name,
          lastname: '',
          payment_options: '',
          company_code: 'FFKE',
          locale: localStorage.language,
        };
        this.$paymentInit(buPayload, 'checkout');
        localStorage.setItem('ItemPaid', true);
        this.setCheckoutDialogVisible(false);
        localStorage.setItem('CheckoutModal', 'Receipt');
      } catch (e) {
        console.log(e);
      }
    },
    closeCheckoutModal() {
      this.setCheckoutDialogVisible(false);
    },
  },
};
</script>
<style>
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
.payment-checkout-header-icon {
  margin-top: -5px;
  font-size: 30px !important;
  font-weight: 700px !important;
  color: #909399 !important;
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
.text-desc {
  line-height: 10px;
}
</style>
