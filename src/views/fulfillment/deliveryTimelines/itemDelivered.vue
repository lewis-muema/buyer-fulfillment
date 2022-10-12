<template lang="">
  <div>
    <div v-if="itemDelivered" class="fulfillemnt-order-items-expected-deivery">
      <p class="delivered-title">{{ $t("desktop.packageDelivered") }}</p>
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
    ...mapGetters(['getData']),
    itemDelivered() {
      return this.getStatus([9]).includes(this.$store.getters.getDeliveryStatus);
    },
  },
};
</script>
<style lang=""></style>
