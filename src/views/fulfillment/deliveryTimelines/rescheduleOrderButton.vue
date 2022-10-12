<template lang="">
  <div>
    <div
      v-if="getStatus([]).includes($store.getters.getDeliveryStatus)"
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
        {{ $t("desktop.rescheduleDelivery") }}
      </el-button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import statusMixin from '../../../mixins/status_mixin';

export default {
  mixins: [statusMixin],
  name: 'RescheduleOrderButton',
  methods: {
    ...mapMutations(['setDatePickerVisible']),
    showDatePicker() {
      this.setDatePickerVisible(true);
    },
  },
};
</script>
<style lang=""></style>
