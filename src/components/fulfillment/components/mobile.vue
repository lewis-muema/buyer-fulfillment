<template>
  <div>
    <Header />
    <div class="fulfillemnt-order-items-container">
      <div>
        <div class="fulfillemnt-order-items-title">
          {{ Object.keys(data).length > 0 ?
              data.data.recipientContactInformation.customer_name :
              '--' }}
        </div>
        <div class="fulfillemnt-order-items-description">
          <span v-if="Object.keys(data).length > 0 && data.data.products.length > 0"
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
      v-if="$store.getters.getDeliveryStatus === 0 ||
        $store.getters.getDeliveryStatus === 1"
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        Expected delivery
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        {{ Object.keys(data).length > 0 ?
              formatDate(data.data.expectedDeliveryDate.date) :
              '--' }}
      </p>
      <div>
        <button class="reschedule" @click="showDatePicker()">
          Reschedule delivery date
        </button>
      </div>
    </div>
    <div
      class="fulfillemnt-order-items-expected-deivery"
      v-if="$store.getters.getDeliveryStatus === 2"
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        Give this pin to the delivery person
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        <span class="rider-pin-mobile">
          PIN: {{ Object.keys(data).length > 0 ?
              data.data.confirmationPin :
              '--' }}
        </span>
      </p>
    </div>
    <div
      v-if="$store.getters.getDeliveryStatus === 3"
      class="fulfillemnt-order-items-expected-deivery"
    >
      <p class="delivered-title">Package has been delivered</p>
      <p class="delivered-date">{{ formatDate(data.data.expectedDeliveryDate.date) }}</p>
    </div>
    <Reschedule />
    <Rating v-if="$store.getters.getDeliveryStatus === 3" />
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
import Reschedule from '../../../views/fulfillment/reschedule.vue';

export default {
  components: {
    Header,
    orderItems,
    Timeline,
    Recipient,
    Rating,
    Reschedule,
  },
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
    showDatePicker() {
      this.$store.commit('setDatePickerVisible', true);
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
</style>
