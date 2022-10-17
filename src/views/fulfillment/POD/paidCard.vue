<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template lang="">
  <div class="payments-on-delivery-container paid-card-container">
    <div class="d-flex">
      <span>
        <el-icon class="paid-check-icon"><SuccessFilled /></el-icon>
      </span>
      <div class="paid-card-desc">
        <p class="payments-on-delivery-text">
          {{ currency }} {{ totalAmount }} has been paid for this delivery.
        </p>
        <p class="payments-on-delivery-button">
          <a class="view-receipt" @click="viewReceipt">View payment receipt</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { SuccessFilled } from '@element-plus/icons';

export default {
  props: ['totalAmount', 'currency'],
  components: { SuccessFilled },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['setCheckoutDialogVisible']),
    viewReceipt() {
      this.setCheckoutDialogVisible(true);
    },
  },
};
</script>
<style>
.paid-check-icon {
  color: #064a23;
  width: 26px;
  height: 26px;
  /* padding-left: 20px; */
}
.paid-card-desc p{
  margin: 0;
  padding: 0
}
.paid-card-desc {
  padding-left: 10px;
}
.paid-card-container {
  padding: 20px 20px 20px 10px !important;
}
</style>
