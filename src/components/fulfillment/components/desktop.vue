<template>
  <div>
    <Header />
    <el-container>
      <el-row>
        <el-col :span="12">
          <el-card shadow="never">
            <div class="order">
              <h3>Marini Natural Order</h3>
              <div class="delivery mt-5" v-if="isDeliveryPlaced">
                <p>Expected Delivery</p>
                <p class="date">{{ date }}</p>
              </div>
              <div class="delivery mt-5" v-if="hasRiderArrived && !isDeliveryPlaced">
                <p>PIN : 2045</p>
                <p>
                  <i class="el-icon-info"></i><small>Give this Pin to the delivery Person</small>
                </p>
              </div>
              <div v-if="isPackageDelivered && !isDeliveryPlaced" class="delivery mt-5">
                <p class="date">Package has been delivered</p>
                <p>{{ date }}</p>
              </div>
              <div v-if="isMorning">
                <p class="date">{{ time }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <Recepient />
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="12" v-if="isPackageDelivered">
          <Rating />
        </el-col>
        <el-col :span="12" v-else>
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
import Header from '../../../views/fulfillment/header.vue';
import Recepient from '../../../views/fulfillment/recipient.vue';
import Timeline from '../../../views/fulfillment/timeline.vue';
import OrderItems from '../../../views/fulfillment/orderItems.vue';
import Rating from '../../../views/fulfillment/rating.vue';

export default {
  components: {
    Header,
    Recepient,
    Timeline,
    OrderItems,
    Rating,
  },
  data() {
    return {
      isMorning: false,
      hasRiderArrived: false,
      isDeliveryPlaced: true,
      isPackageDelivered: false,
      time: '2pm - 4pm',
      date: 'Wednesday, 25th August',
    };
  },
};
</script>

<style>
.el-card {
  margin-left: 80px;
  height: 14rem;
}
.order {
  text-align: left;
}
.date {
  color: #324ba8;
  font-weight: 700;
}
.el-row {
  padding-top: 2%;
}
.delivery {
  line-height: 1.1;
}
</style>
