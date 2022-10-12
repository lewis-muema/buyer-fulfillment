<template lang="">
    <div>
        <div class="change-info-section-divider">
          <div class="change-info-section-reschedule">
            <p class="fulfillemnt-order-items-expected-deivery-title">
              {{ $t('changeInfo.deliveryDate') }}
            </p>
            <p>
              <el-icon><Clock /></el-icon>
              {{
                Object.keys($store.getters.getData).length > 0
                  ? formatDate($store.getters.getData.data.scheduled_delivery_date)
                  : "--"
              }}
            </p>
            <button
            :disabled="!getStatus([0, 1, 12, 13, 14, 15])
              .includes($store.getters.getDeliveryStatus)"
              class="reschedule-button"
              @click="showDatePicker()"
            >
              {{ $t('changeInfo.Reschadule') }}
            </button>
          </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { Clock } from '@element-plus/icons';
import formatDates from '../../../mixins/formatDate_mixin';
import statusMixin from '../../../mixins/status_mixin';

export default {
  name: 'RescheduleDateButton',
  mixins: [statusMixin, formatDates],
  components: {
    Clock,
  },

  methods: {
    ...mapMutations(['setDatePickerVisible']),
    showDatePicker() {
      this.setDatePickerVisible(true);
    },
  },
};
</script>
<style lang="">

</style>
