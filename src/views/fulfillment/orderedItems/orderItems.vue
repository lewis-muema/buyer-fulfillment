<template>
  <div>
    <div :class="!$store.getters.getMobile ? 'items-delivered-desktop' : 'items-delivered-mobile'">
      <div class="d-flex flex-row" v-for="(orderItem, index) in orderItems" :key="index">
        <el-badge :value="orderItem.product_unit_count" class="item" type="primary">
          <div class="p-2">
            <img :src="orderItem.product_image_link" alt="" class="item-image" />
          </div>
        </el-badge>
        <div class="order-items">
          <p>{{ orderItem.product_name }}</p>
          <p class="text-muted">
            {{ orderItem.product_unit_currency}} {{ orderItem.product_unit_price }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'OrderItems',
  computed: {
    ...mapGetters(['getData']),
    orderItems() {
      return this.getData.data.products;
    },
  },
};
</script>

<style>
.items-delivered-mobile {
  margin: 15px 0px;
}
.item-image {
  height: 60px;
  width: 60px;
}
.order-items {
  line-height: 20px!important;
  margin: 5px 5px!important;
}
.el-badge__content--primary {
  background-color: #324ba8;
}
.el-badge__content {
  border-radius: 50% !important;
  border: none;
  line-height: 28px;
  height: 28px;
  width: 50%;
}
.el-badge__content.is-fixed {
  transform: translateY(-5%) translateX(60%);
  right: 17px;
}
</style>
