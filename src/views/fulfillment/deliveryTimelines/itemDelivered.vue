<template lang="">
  <div>
    <div v-if="itemDelivered" :class="getMobile ? 'fulfillemnt-order-items-expected-deivery'
    : 'items-delivered-container'">
      <p :class="getMobile ? 'delivered-date' :
      'delivered-date-desktop'">{{ $t("desktop.packageDelivered") }}</p>
      <p class="delivered-date">
        {{ formatCompletionDate(getData.data.order_completion_date) }}
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
  name: 'ItemDelivered',
  computed: {
    ...mapGetters(['getData', 'getMobile']),
    itemDelivered() {
      return this.getStatus([9]).includes(this.$store.getters.getDeliveryStatus);
    },
  },
};
</script>
<style>
.items-delivered-container {
  margin: 0 !important;
}
.delivered-date-desktop {
  color: #324ba8;
  font-weight: 700;
}
</style>
