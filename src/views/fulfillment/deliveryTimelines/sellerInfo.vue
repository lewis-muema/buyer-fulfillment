<template lang="">
  <div>
    <h3>
        {{ Object.keys(getData.data).length > 0 ? getData.data.seller_name : "--" }}
      </h3>
      <div class="order-number">{{ $t("orderNumber") }}: {{ getData.data.order_id }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SellerInfo',
  computed: {
    ...mapGetters(['getData']),
  },
};
</script>
<style>
.order-number {
  font-weight: 600;
}
</style>
