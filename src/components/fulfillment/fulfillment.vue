<template>
  <div>
    <Header />
    <el-container>
      <el-row>
        <el-col :span="12">
          <el-card shadow="never">
            <h2>Marini Natural Order</h2>
            <p>Expected Delivery</p>
            <p>{{ date }}</p>
          </el-card>
        </el-col>
        <el-col :span="12">
          <Recepient />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <Timeline />
        </el-col>
        <el-col :span="12">
          <OrderItems />
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import Header from '../../views/fulfillment/header.vue';
import Recepient from '../../views/fulfillment/recipient.vue';
import Timeline from '../../views/fulfillment/timeline.vue';
import OrderItems from '../../views/fulfillment/orderItems.vue';
import NotificationMxn from '../../mixins/nofication_mixin';

export default {
  name: 'fulfillment',
  mixins: [NotificationMxn],
  components: {
    Header,
    Recepient,
    Timeline,
    OrderItems,
  },
  data() {
    return {
      data: '',
      date: 'Wednesday, 25th August',
    };
  },
  mounted() {},
  methods: {
    showNotification() {
      const notification = {
        title: 'test',
        level: 1,
        message: 'test',
      };
      this.displayNotification(notification);
    },
  },
};
</script>

<style>
.el-card {
  margin-left: 80px;
  height: 180px;
}
</style>
