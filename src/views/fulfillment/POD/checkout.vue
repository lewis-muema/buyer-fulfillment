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
          <p v-if="showCheckoutModal">{{ $t("checkout.priceBreakdown") }}</p>
        </div>
      </div>
      <div v-if="showReceiptModal">
        <span>{{ $t("checkout.amountPaid") }}&nbsp;</span>
        <span> {{ currency }} {{ invoicedAmount }}</span>
        <p>
          {{ formatDate(getData.data.event_time_line[0].event_date) }}
        </p>
      </div>
      <div>
        <div class="row" v-for="(product, index) in products" :key="index">
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
          <p>{{ $t("checkout.subTotal") }}</p>
          <p>
            {{ currency }}
            {{ subtotal }}
          </p>
        </span>
        <span class="checkout-delivery-fee">
          <p>{{ $t("checkout.deliveryFee") }}</p>
          <p>
            {{ currency }}
            {{ fulfillmentFee }}
          </p>
        </span>
        <hr class="price-breakdown-divider" />
      </div>
      <span class="checkout-total-amount">
        <p>{{ $t("checkout.total") }}</p>
        <p>{{ currency }} {{ showCheckoutModal ? totalAmount : invoicedAmount }}</p>
      </span>
      <div class="d-grid gap-2 col-12 mx-auto" v-if="showCheckoutModal">
        <el-button class="change-delivery-el-button" @click="submitToPay">
          {{ $t("checkout.continueToPay") }}
        </el-button>
      </div>
      <div v-if="showReceiptModal">
        <p>{{ $t("checkout.paymentDetails") }}</p>
        <div class="text-desc">
          <p>Mpesa</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { Back } from '@element-plus/icons';
import formatDates from '../../../mixins/formatDate_mixin';

export default {
  name: 'CheckoutCard',
  mixins: [formatDates],
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
    countryCode() {
      const { country } = this.getData.data;
      const countries = [
        {
          country: 'KENYA',
          value: 'KE',
        },
        {
          country: 'NIGERIA',
          value: 'NG',
        },
      ];
      const entry = countries.find((item) => item.country === country);
      return entry ? entry.value : null;
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
          country_code: this.countryCode,
          amount: this.totalAmount,
          success_callback_url: '',
          fail_callback_url: '',
          txref: this.getData.data.order_id,
          bulk: false,
          paybill_no: '',
          email: '',
          authToken: '',
          mobile_number: this.getData.data.destination.phone_number,
          firstname: this.getData.data.destination.name,
          lastname: '',
          payment_options: '',
          company_code: 'FFKE',
          locale: this.getData.data.language,
        };
        this.$paymentInit(buPayload, 'choose-payment-checkout');
        this.setCheckoutDialogVisible(false);
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
  margin-top: -10px;
  font-size: 30px !important;
  font-weight: 700px !important;
  color: #909399 !important;
  cursor: pointer;
}

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
