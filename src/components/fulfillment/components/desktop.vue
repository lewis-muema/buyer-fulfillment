<template>
  <div>
    <Header />
    <div>
      <el-row>
        <el-col :span="12">
          <el-card shadow="never">
            <div class="order">
              <h3>{{ Object.keys(data).length > 0 ?
                data.data.seller_name :
                '--' }}
              </h3>
              <div
                class="delivery mt-5"
                v-if="getStatus([0, 1, 2, 3, 4, 5, 6, 7])
                  .includes($store.getters.getDeliveryStatus)"
              >
                <p>{{ $t('mobile.expectedDelivery') }}</p>
                <p class="date">{{ Object.keys(data).length > 0 ?
                  formatDate(data.data.scheduled_delivery_date) :
                  '--' }}
                </p>
                <p v-if="data.data.estimated_delivery_date"
                  class="date">
                  {{ formatDeliveryWindow(data.data.estimated_delivery_date) }}
                </p>
              </div>
              <div
                class="delivery mt-5"
                v-if="getStatus([8]).includes($store.getters.getDeliveryStatus)"
              >
                <p class="rider-pin">
                  <span>
                    {{ $t('mobile.pin') }}
                  </span>
                  <span class="rider-pin-value">
                    {{ Object.keys(data).length > 0 ?
                        data.data.confirmation_pin :
                        '--' }}
                  </span>
                </p>
                <p class="rider-pin-description">
                 <i class="el-icon-info"></i>
                 <span class="rider-pin-description-text">
                   {{ $t('desktop.givePin') }}
                  </span>
                </p>
              </div>
              <div
                v-if="getStatus([9]).includes($store.getters.getDeliveryStatus)"
                class="delivery mt-5"
              >
                <p class="date">{{ $t('desktop.packageDelivered') }}</p>
                <p>{{ formatCompletionDate(data.data.order_completion_date) }}</p>
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
          <Rating v-if="getStatus([9]).includes($store.getters.getDeliveryStatus)" />
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
import Timeline from '../../../views/fulfillment/timelineV2.vue';
import OrderItems from '../../../views/fulfillment/orderItems.vue';
import Rating from '../../../views/fulfillment/rating.vue';
import statusMixin from '../../../mixins/status_mixin';

export default {
  components: {
    Header,
    Recepient,
    Timeline,
    OrderItems,
    Rating,
  },
  mixins: [statusMixin],
  data() {
    return {
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
    formatCompletionDate(date) {
      return `${moment(new Date(date)).format('ddd, Do MMMM')} at ${moment(new Date(date)).format('h:mm a')}`;
    },
    formatDeliveryWindow(date) {
      const lowerLimit = moment(new Date(date.estimated_delivery_time - (date.large_lower_limit * 60 * 1000))).format('h a');
      const upperLimit = moment(new Date(date.estimated_delivery_time + (date.large_upper_limit * 60 * 1000))).format('h a');
      return `${lowerLimit} - ${upperLimit}`;
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
