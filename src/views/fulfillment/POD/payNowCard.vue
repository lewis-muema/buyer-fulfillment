<template lang="">
  <div>
    <div>
      <h1 class="pay-now-delivery-title">
        Pay for your delivery
      </h1>
      <p class="payments-on-delivery-amount">
        {{ totalAmount }}
      </p>
      <p class="payments-on-delivery-text">
        Your items arrive have arrived
      </p>
      <span class="payments-on-delivery-button">
        <el-button class="change-delivery-el-button">
          Pay Now
        </el-button>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['totalAmount'],
};
</script>
<style lang=""></style>
