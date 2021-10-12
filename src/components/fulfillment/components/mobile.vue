<template>
  <div>
    <Header />
    <div class="fulfillemnt-order-items-container">
      <div>
        <div class="fulfillemnt-order-items-title">
          {{ Object.keys(data).length > 0 ?
              data.data.seller_name :
              '--' }}
        </div>
        <div class="fulfillemnt-order-items-description">
          <span
            class="fulfillemnt-order-items-header"
            v-if="Object.keys(data).length > 0 && data.data.products.length > 0"
            @click="showItems = !showItems">
            {{ Object.keys(data).length > 0 && data.data.products.length > 0 ?
              data.data.products[0].product_name :
              '' }} {{ Object.keys(data).length > 0 && data.data.products.length > 1 ?
              `and ${data.data.products.length - 1} other items` : '' }}
            <i :class="!showItems ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
          </span>
          <order-items v-if="showItems" />
        </div>
      </div>
    </div>
    <div
      class="fulfillemnt-order-items-expected-deivery"
      v-if="getStatus([0, 1, 2, 3, 4, 5, 6, 7])
        .includes($store.getters.getDeliveryStatus)"
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        Expected delivery
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        {{ Object.keys(data).length > 0 ?
              formatDate(data.data.scheduled_delivery_date) :
              '--' }}
      </p>
      <div>
        <div
          class="change-details-title"
        >
          Not going to be in?
        </div>
        <el-button @click="showDetailsPicker()">
          Change Delivery details
        </el-button>
      </div>
    </div>
    <div
      class="fulfillemnt-order-items-expected-deivery"
      v-if="getStatus([8]).includes($store.getters.getDeliveryStatus)"
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        Give this pin to the delivery person
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        <span class="rider-pin-mobile">
          PIN: {{ Object.keys(data).length > 0 ?
              data.data.confirmation_pin :
              '--' }}
        </span>
      </p>
    </div>
    <div
      v-if="getStatus([9]).includes($store.getters.getDeliveryStatus)"
      class="fulfillemnt-order-items-expected-deivery"
    >
      <p class="delivered-title">Package has been delivered</p>
      <p class="delivered-date">{{ formatDate(data.data.order_completion_date) }}</p>
    </div>
    <changeinfo />
    <Rating v-if="getStatus([9]).includes($store.getters.getDeliveryStatus)" />
    <Timeline />
    <Recipient />
  </div>
</template>

<script>
import moment from 'moment';
import Header from '../../../views/fulfillment/header.vue';
import orderItems from '../../../views/fulfillment/orderItems.vue';
import Timeline from '../../../views/fulfillment/timeline.vue';
import Recipient from '../../../views/fulfillment/recipient.vue';
import Rating from '../../../views/fulfillment/rating.vue';
import changeinfo from '../../../views/fulfillment/changeInfo.vue';
import statusMixin from '../../../mixins/status_mixin';

export default {
  components: {
    Header,
    orderItems,
    Timeline,
    Recipient,
    Rating,
    changeinfo,
  },
  mixins: [statusMixin],
  data() {
    return {
      showItems: false,
      data: this.$store.getters.getData,
    };
  },
  watch: {
    '$store.getters.getData': function setData() {
      this.data = this.$store.getters.getData;
    },
  },
  methods: {
    showDetailsPicker() {
      this.$store.commit('setDetailsDialogVisible', true);
    },
    formatDate(date) {
      return moment(new Date(date)).format('dddd, Do MMMM');
    },
  },
};
</script>

<style>
.delivered-title {
  margin: 15px 0px !important;
  font-weight: 600;
  font-size: 18px;
}
.delivered-date {
  font-weight: 600;
  font-size: 18px;
  color: #606266;
}
.rider-pin-mobile {
  letter-spacing: 0.25px;
  color: #EE7D00;
  font-weight: 700;
}
.change-details-title {
  color: #909399;
  font-size: 13px;
  margin: 5px 0px;
}
.fulfillemnt-order-items-header {
  text-transform: capitalize;
}
</style>
