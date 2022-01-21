<template>
  <div>
    <Header />
    <div class="fulfillemnt-order-items-container">
      <div>
        <div class="fulfillemnt-order-items-title">
          {{ Object.keys(data).length > 0 ? data.data.seller_name : "--" }}
        </div>
        <div class="fulfillemnt-order-items-description">
          <span
            class="fulfillemnt-order-items-header"
            v-if="Object.keys(data).length > 0 && data.data.products.length > 0"
            @click="showItems = !showItems"
          >
            {{
              Object.keys(data).length > 0 && data.data.products.length > 0
                ? data.data.products[0].product_name
                : ""
            }}
            {{
              Object.keys(data).length > 0 && data.data.products.length > 1
                ? `${$t("mobile.and")} ${data.data.products.length - 1} ${$t(
                    "mobile.otherItems"
                  )} `
                : ""
            }}
            <i
              :class="!showItems ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            ></i>
          </span>
          <order-items v-if="showItems" />
        </div>
      </div>
    </div>
    <div
      class="fulfillemnt-order-items-expected-deivery"
      v-if="
        getStatus([0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 15]).includes(
          $store.getters.getDeliveryStatus
        )
      "
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        {{ $t("mobile.expectedDelivery") }}
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        {{
          Object.keys(data).length > 0
            ? formatDate(data.data.scheduled_delivery_date)
            : "--"
        }}
      </p>
      <p v-if="data.data.estimated_delivery_date" class="date">
        {{ formatDeliveryWindow(data.data.estimated_delivery_date) }}
      </p>
      <div>
        <div class="change-details-title">
          {{ $t("mobile.notIn") }}
        </div>
        <el-button
          @click="showDetailsPicker()"
          class="change-delivery-el-button"
        >
          {{ $t("mobile.changeDetails") }}
        </el-button>
      </div>
    </div>
    <div
      class="fulfillemnt-order-items-expected-deivery"
      v-if="getStatus([8]).includes($store.getters.getDeliveryStatus)"
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        {{ $t("desktop.givePin") }}
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        <span class="rider-pin-mobile">
          {{ $t("mobile.pin") }}
          {{ Object.keys(data).length > 0 ? data.data.confirmation_pin : "--" }}
        </span>
      </p>
    </div>
    <div
      v-if="getStatus([9]).includes($store.getters.getDeliveryStatus)"
      class="fulfillemnt-order-items-expected-deivery"
    >
      <p class="delivered-title">{{ $t("desktop.packageDelivered") }}</p>
      <p class="delivered-date">
        {{ formatCompletionDate(data.data.order_completion_date) }}
      </p>
    </div>
    <div
      v-if="getStatus([10, 11]).includes($store.getters.getDeliveryStatus)"
      class="fulfillemnt-order-items-expected-deivery"
    >
      <p class="delivered-title">{{ $t("desktop.orderCancelled") }}</p>
      <p class="delivered-date">
        {{
          formatCompletionDate(
            data.data.event_time_line[data.data.event_time_line.length - 1]
              .event_date
          )
        }}
      </p>
    </div>
    <div
      v-if="getStatus([12]).includes($store.getters.getDeliveryStatus)"
      class="fulfillemnt-order-items-failed-delivery"
    >
      <p class="failed-delivery-title">
        {{ $t("desktop.deliveryFailed.title") }}
      </p>
      <p class="failed-delivery-desc">
        {{ $t("desktop.deliveryFailed.unavailable") }}
      </p>
      <p class="failed-delivery-desc2">
        {{ $t("desktop.deliveryFailed.reschedule") }}
      </p>
      <el-button @click="showDatePicker()" class="show-datepicker-el-button">
        {{ $t("Reschedule delivery") }}
      </el-button>
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
import Timeline from '../../../views/fulfillment/timelineV2.vue';
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
    showDatePicker() {
      this.$store.commit('setDatePickerVisible', true);
    },
    formatDate(date) {
      return moment(new Date(date)).format('dddd, Do MMMM');
    },
    formatCompletionDate(date) {
      return `${moment(new Date(date)).format('ddd, Do MMMM')} at ${moment(
        new Date(date),
      ).format('h:mm a')}`;
    },
    formatDeliveryWindow(date) {
      const lowerLimit = moment(
        new Date(
          date.estimated_delivery_time - date.large_lower_limit * 60 * 1000,
        ),
      ).format('h a');
      const upperLimit = moment(
        new Date(
          date.estimated_delivery_time + date.large_upper_limit * 60 * 1000,
        ),
      ).format('h a');
      return `${lowerLimit} - ${upperLimit}`;
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
  color: #ee7d00;
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
.change-delivery-el-button {
  margin: 0px 0px 20px !important;
}
.show-datepicker-el-button {
  margin: 0px 0px 20px !important;
  max-width: 170px;
}
</style>
