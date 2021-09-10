<template>
  <div>
    <Header />
    <div class="fulfillemnt-order-items-container">
      <div>
        <div class="fulfillemnt-order-items-title">
          Marini Natural order
        </div>
        <div class="fulfillemnt-order-items-description">
          <span @click="showItems = !showItems">
            Shea Butter and 2 other items
            <i :class="!showItems ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
          </span>
          <order-items v-if="showItems" />
        </div>
      </div>
    </div>
    <div class="fulfillemnt-order-items-expected-deivery">
      <p class="fulfillemnt-order-items-expected-deivery-title">
        Expected delivery
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        Wednesday, 25th Aug
      </p>
      <div>
        <button class="reschedule" @click="showDatePicker()">
          Reschedule delivery date
        </button>
      </div>
    </div>
    <Reschedule />
    <Rating />
    <Timeline />
    <Recipient />
  </div>
</template>

<script>
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
    };
  },
  methods: {
    showDatePicker() {
      this.$store.commit('setDatePickerVisible', true);
    },
  },
};
</script>

<style>

</style>
