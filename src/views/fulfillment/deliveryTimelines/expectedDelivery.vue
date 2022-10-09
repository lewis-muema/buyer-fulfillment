<template lang="">
  <div>
    <div
      class="fulfillemnt-order-items-expected-deivery"
      v-if="getStatus([0, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16]).includes(getDeliveryStatus)"
    >
      <p class="fulfillemnt-order-items-expected-deivery-title">
        {{ $t("mobile.expectedDelivery") }}
      </p>
      <p class="fulfillemnt-order-items-expected-deivery-date">
        {{
          Object.keys(getData).length > 0 ? formatDate(getData.data.scheduled_delivery_date) : "--"
        }}
      </p>
      <p v-if="getData.data.estimated_delivery_date" class="date">
        {{ formatDeliveryWindow(getData.data.estimated_delivery_date) }}
      </p>
      <div>
        <div class="change-details-title">
          {{ $t("mobile.notIn") }}
        </div>
        <el-button @click="showDetailsPicker()" class="change-delivery-el-button">
          {{ $t("mobile.changeDetails") }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import statusMixin from '../../../mixins/status_mixin';
import formatDates from '../../../mixins/formatDate_mixin';

export default {
  name: 'ExpectedDelivery',
  mixins: [statusMixin, formatDates],
  computed: {
    ...mapGetters(['getData', 'getDeliveryStatus']),
  },
  methods: {
    ...mapMutations(['setDetailsDialogVisible']),
    showDetailsPicker() {
      this.setDetailsDialogVisible(true);
    },
  },
};
</script>
<style>
  .el-button {
  background: #324ba8 !important;
  color: white !important;
  padding: 22px 12px !important;
}
</style>
