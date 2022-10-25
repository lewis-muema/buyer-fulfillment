<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable -->
<template lang="">
  <div>
    <div class="fulfillemnt-order-items-container">
      <div>
        <div class="fulfillemnt-order-items-title" v-if="$store.getters.getMobile">
          {{ Object.keys(getData).length > 0 ? getData.data.seller_name : "--" }}
        </div>
        <h3 v-if="!$store.getters.getMobile">{{ $t('orderItems.products') }}</h3>
        <div class="fulfillemnt-order-items-description d-flex">
          <div
            class="fulfillemnt-order-items-header"
            v-if="Object.keys(getData).length > 0 && getData.data.products.length > 0"
            @click="showItems = !showItems"
          >
          {{formatOrderName(
              Object.keys(getData).length > 0 && getData.data.products.length > 0
                ? getData.data.products[0].product_name
                : ""
            )}}
           {{formatOrderName(
              Object.keys(getData).length > 0 && getData.data.products.length > 1
                ? `${$t("mobile.and")}
                ${getData.data.products.length - 1} ${$t("mobile.otherItems")} `
                : ""
            )}}
          </div>
          <el-icon v-if="!showItems" class="ordered-items-header-icons"><ArrowDown class="header-arrow-down" /></el-icon>
          <el-icon v-else><ArrowUp /></el-icon>
        </div>
        <order-items v-if="showItems" />
      </div>
      <div class="order-number" v-if="$store.getters.getMobile">{{ $t("orderNumber") }}: {{ getData.data.order_id }}</div>
    </div>
  </div>
</template>
<script>
import { ArrowDown, ArrowUp } from '@element-plus/icons';
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
    ArrowDown,
    ArrowUp,
  },
  computed: {
    ...mapGetters(['getData']),
  },
  methods: {
    formatOrderName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
  },
};
</script>
<style>
.ordered-items-header-icons {
  font-size: 15px;
  padding-top: 10px;
}
</style>
