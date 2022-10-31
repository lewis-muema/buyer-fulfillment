<template lang="">
  <div>
    <div
      v-if="showCancelledCard"
      :class="getMobile ? 'fulfillemnt-order-items-expected-deivery' : 'items-cancelled-container'"
    >
      <p class="delivered-title">{{ $t("desktop.orderCancelled") }}</p>
      <p :class="getMobile ? 'delivered-date' : 'delivered-date-desktop'">
        {{
          formatCompletionDate(
            getData.data.event_time_line[getData.data.event_time_line.length - 1].event_date
          )
        }}
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import statusMixin from '../../../mixins/status_mixin';
import formatDates from '../../../mixins/formatDate_mixin';

export default {
  mixins: [statusMixin, formatDates],
  name: 'orderCanceled',
  computed: {
    ...mapGetters(['getData', 'getMobile']),
    showCancelledCard() {
      return this.getData.data.order_status === 'ORDER_CANCELED';
    },
  },
};
</script>
<style lang=""></style>
