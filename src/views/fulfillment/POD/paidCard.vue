<template lang="">
  <div>
    <div>
      <div class="payments-on-delivery-text paid-sucessful-text">
        KES {{ totalAmount }} has been paid for this delivery.
      </div>
      <span class="payments-on-delivery-button">
        <a class="" @click="viewReceipt">View payment receipt</a>
      </span>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  props: ['totalAmount'],
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
<style lang=""></style>
