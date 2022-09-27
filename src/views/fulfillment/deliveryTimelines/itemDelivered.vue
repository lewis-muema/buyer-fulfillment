<template lang="">
  <div>
    <div
      v-if="getStatus([9]).includes($store.getters.getDeliveryStatus)"
      class="fulfillemnt-order-items-expected-deivery"
    >
      <p class="delivered-title">{{ $t("desktop.packageDelivered") }}</p>
      <p class="delivered-date">
        {{ formatCompletionDate(data.data.order_completion_date) }}
      </p>
    </div>
  </div>
</template>
<script>
import statusMixin from '../../../mixins/status_mixin';
import formatDates from '../../../mixins/formatDate_mixin';

export default {
  mixins: [statusMixin, formatDates],
  name: 'ItemDelivered',
};
</script>
<style lang=""></style>
