<template lang="">
  <div>
    <div
      v-if="getStatus([10, 11]).includes($store.getters.getDeliveryStatus)"
      class="fulfillemnt-order-items-expected-deivery"
    >
      <p class="delivered-title">{{ $t("desktop.orderCancelled") }}</p>
      <p class="delivered-date">
        {{
          formatCompletionDate(
            getData.data.event_time_line[data.data.event_time_line.length - 1].event_date
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
    ...mapGetters(['getData']),
  },
};
</script>
<style lang=""></style>
