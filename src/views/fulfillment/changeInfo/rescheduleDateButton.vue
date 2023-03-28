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
            :disabled="isToday"
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
import moment from 'moment';
import { Clock } from '@element-plus/icons';
import formatDates from '../../../mixins/formatDate_mixin';
import statusMixin from '../../../mixins/status_mixin';

export default {
  name: 'RescheduleDateButton',
  mixins: [statusMixin, formatDates],
  components: {
    Clock,
  },
  computed: {
    isToday() {
      return (
        moment(new Date(this.$store.getters.getData.data.scheduled_delivery_date)).format(
          'YYYY-MM-DD',
        ) === moment().format('YYYY-MM-DD')
        || this.getStatus([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16])
          .includes(this.$store.getters.getDeliveryStatus)
      );
    },
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
