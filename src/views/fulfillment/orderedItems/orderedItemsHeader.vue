<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable -->
<template lang="">
  <div>
    <div class="fulfillemnt-order-items-container">
      <div>
        <div class="fulfillemnt-order-items-title">
          {{ Object.keys(getData).length > 0 ? getData.data.seller_name : "--" }}
        </div>
        <div class="fulfillemnt-order-items-description">
          <span
            class="fulfillemnt-order-items-header"
            v-if="Object.keys(getData).length > 0 && getData.data.products.length > 0"
            @click="showItems = !showItems"
          >
            {{
              Object.keys(getData).length > 0 && getData.data.products.length > 0
                ? getData.data.products[0].product_name
                : ""
            }}
            {{
              Object.keys(getData).length > 0 && getData.data.products.length > 1
                ? `${$t("mobile.and")}
                ${getData.data.products.length - 1} ${$t("mobile.otherItems")} `
                : ""
            }}
            <i
              :class="!showItems ? 'bi bi-chevron-down' : 'bi bi-chevron-up'"
              class="order-items-header-icons"
            ></i>
          </span>
          <order-items v-if="showItems" />
        </div>
      </div>
      <div class="order-number">{{ $t("desktop.orderNumber") }}: {{ getData.data.order_id }}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import OrderItems from './orderItems.vue';

export default {
  name: 'OrderedItemsHeader',
  data() {
    return {
      showItems: false,
    };
  },
  components: {
    OrderItems,
  },
  computed: {
    ...mapGetters(['getData']),
  },
};
</script>
<style>
.order-items-header-icons {
  padding-top: 50px;
}
</style>
