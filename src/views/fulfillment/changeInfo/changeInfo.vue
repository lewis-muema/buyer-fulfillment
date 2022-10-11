<template>
  <div>
    <el-dialog
      :title="$t('updateDetails.updateDeliveryInfo')"
      v-model="setDetailsDialogStatus"
      :width="$store.getters.getMobile ? '100%' : '30%'"
      :fullscreen="$store.getters.getMobile ? true : false"
      :show-close="$store.getters.getMobile ? true : false"
      center
      :close-on-click-modal="true"
    >
    <ReceiverSummaryInfo />
    <RescheduleDateButton />
    </el-dialog>
    <RescheduleCard />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import statusMixin from '../../../mixins/status_mixin';
import notificationMxn from '../../../mixins/nofication_mixin';
import ReceiverSummaryInfo from './receiverSummaryInfo.vue';
import RescheduleDateButton from './rescheduleDateButton.vue';
import RescheduleCard from '../reschedule/reschedule.vue';

export default {
  components: { ReceiverSummaryInfo, RescheduleDateButton, RescheduleCard },
  mixins: [statusMixin, notificationMxn],
  computed: {
    ...mapGetters(['getDetailsDialogVisible', 'getData']),
    setDetailsDialogStatus: {
      get() {
        return this.getDetailsDialogVisible;
      },
      set(val) {
        return this.$store.commit('setDetailsDialogVisible', val);
      },
    },
  },
};
</script>

<style>
.reschedule-button {
  width: 100%;
  border: 1px solid #324ba8;
  color: #324ba8;
  padding: 10px;
  border-radius: 5px;
  background: transparent;
}
.change-info-section-divider {
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
}
.change-info-data-fields {
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  width: 100%;
  margin-bottom: 10px !important;
}
.section-alignment {
  margin-left: -20px !important;
  margin-bottom: -10px;
  margin-top: -20px;
}
.el-button {
  background: #324ba8 !important;
  border-color: #324ba8 !important;
  margin: 10px 0px;
  color: white !important;
}
.recepient-info-desktop {
  padding-left: 100px;
}
.recepient-info-mobile {
  margin-left: 20px;
}
.change-info-button-mobile {
  width: 100%;
}
.update-info-button-desktop {
  margin-bottom: 0;
}
.recepient-info-title-mobile {
  margin: 20px 0px;
  color: #606266;
  text-transform: uppercase;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 1.5px;
  text-align: left;
}
.recepient > div > p > i {
  margin-right: 10px;
}
/* .recepient {
  line-height: 0;
} */
/* .recipient-details {
  display: flex;
  height: 40px;
  justify-content: flex-start;
  flex-direction: column;
} */
.recipient-indent-text {
  margin-left: 25px;
}
.recipient-details-leave-delivery {
  color: #324ba8 !important;
  margin: 10px 0px;
}
.change-info-title {
  word-break: normal;
}
.reschedule-button:disabled {
  background-color:#E5E5E5;
  color: grey;
}
</style>
