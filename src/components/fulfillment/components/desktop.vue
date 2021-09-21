<template>
  <div>
    <Header />
    <div>
      <el-row>
        <el-col :span="12">
          <el-card shadow="never">
            <div class="order">
              <h3>{{ Object.keys(data).length > 0 ?
                data.data.seller :
                '--' }}
              </h3>
              <div
                class="delivery mt-5"
                v-if="$store.getters.getDeliveryStatus === 0 ||
                  $store.getters.getDeliveryStatus === 1"
              >
                <p>Expected Delivery</p>
                <p class="date">{{ Object.keys(data).length > 0 ?
                  formatDate(data.data.expectedDeliveryDate.date) :
                  '--' }}
                </p>
              </div>
              <div
                class="delivery mt-5"
                v-if="$store.getters.getDeliveryStatus === 2"
              >
                <p class="rider-pin">
                  <span>
                    PIN:
                  </span>
                  <span class="rider-pin-value">
                    {{ Object.keys(data).length > 0 ?
                        data.data.confirmationPin :
                        '--' }}
                  </span>
                </p>
                <p class="rider-pin-description">
                 <i class="el-icon-info"></i>
                 <span class="rider-pin-description-text">
                   Give this PIN to the delivery person
                  </span>
                </p>
              </div>
              <div v-if="$store.getters.getDeliveryStatus === 3" class="delivery mt-5">
                <p class="date">Package has been delivered</p>
                <p>{{ formatDate(data.data.expectedDeliveryDate.date) }}</p>
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
        <el-col :span="12">
          <Rating v-if="$store.getters.getDeliveryStatus === 3" />
          <Timeline />
        </el-col>
        <el-col :span="12">
          <OrderItems />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
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
      data: this.$store.getters.getData,
    };
  },
  watch: {
    '$store.getters.getData': function setData() {
      this.data = this.$store.getters.getData;
    },
  },
  methods: {
    formatDate(date) {
      return moment(new Date(date)).format('dddd, Do MMMM');
    },
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
.rider-pin {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.4px;
}
.rider-pin-value {
  font-size: 20px;
  color: #EE7D00;
}
.rider-pin-description {
  font-size: 12px;
}
.rider-pin-description-text {
  margin-left: 10px;
  font-size: 14px;
  letter-spacing: 0.4px;
}
</style>
