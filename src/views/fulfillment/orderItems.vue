<template>
  <div>
    <div :class="!$store.getters.getMobile ? 'items-delivered-desktop' : 'items-delivered-mobile'">
      <h3 v-if="!$store.getters.getMobile">Items being delivered</h3>
      <div class="d-flex flex-row mt-3" v-for="(orderItem, index) in orderItems"
        :key="index">
        <el-badge :value="orderItem.product_quantity" class="item" type="primary">
          <div class="p-2">
            <img src="../../assets/shear-butter.jpg" alt="" class="img-fluid"  />
          </div>
        </el-badge>
        <div class="d-flex flex-column">
          <p class="order-name">{{ orderItem.product_name }}</p>
          <p class="text-muted">KES {{ orderItem.product_unit_price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderItems',
  data() {
    return {
      title: 'Marini Natural Order',
      orderItems: this.$store.getters.getData.data.products,
    };
  },
};
</script>

<style>
.items-delivered-desktop {
  text-align: left;
  padding-left: 100px;
}
.items-delivered-mobile {
  margin: 15px 0px;
}
.order-name {
  margin-bottom: 5%;
}
</style>
