<template>
  <div>
    <el-dialog
      title="Update delivery Info"
      :visible.sync="visibleDetailsDialog"
      :width="$store.getters.getMobile ? '100%' : '30%'"
      :fullscreen="$store.getters.getMobile ? true : false"
      :show-close="$store.getters.getMobile ? true : false"
      center
      :close-on-click-modal="true"
    >
      <div v-loading="$store.getters.getLoading">
        <div class="ml-2 change-info-title">
          Help us ensure that you get your package on the first delivery attempt
        </div>
        <div class="change-info-section-divider">
          <div class="section-alignment">
          <div class="recepient-info-mobile">
            <h3 class="recepient-info-title-mobile">Receiver</h3>
            <div class="recepient">
              <div class="recipient-details">
                <p class="change-info-data-fields">
                  <i class="el-icon-user"></i>
                    {{ recepientInfo.name }}
                </p>
              </div>
              <div class="recipient-details">
                <p class="change-info-data-fields">
                  <i class="el-icon-phone"></i>
                    {{ recepientInfo.phone_number }}
                </p>
              </div>
              <div class="recipient-details">
                <p class="change-info-data-fields">
                  <i class="el-icon-location-outline"></i>
                  {{
                    recepientInfo.delivery_location
                      ? recepientInfo.delivery_location.description
                      : ""
                  }}
                </p>
                <p class="">
                  <small class="text-muted recipient-indent-text">
                    {{ recepientInfo.house_location }}
                  </small>
                </p>
              </div>
              <div
                v-if="!getStatus([9, 10]).includes($store.getters.getDeliveryStatus)"
                class="recipient-details"
              >
              </div>
            </div>
            <el-button
              v-if="!getStatus([9, 10]).includes($store.getters.getDeliveryStatus)"
              type="primary"
              @click="showUpdateModal"
              class="change-info-button-mobile"
              >Change Receiver Info</el-button
            >
          </div>
          </div>
        </div>
        <div class="change-info-section-divider">
          <div class="change-info-section-reschedule">
            <p class="fulfillemnt-order-items-expected-deivery-title">
              Delivery Date
            </p>
            <p>
              <i class="el-icon-time"></i>
              {{ Object.keys($store.getters.getData).length > 0 ?
                    formatDate($store.getters.getData.data.scheduled_delivery_date) :
                    '--' }}
            </p>
            <button
              class="reschedule-button"
              @click="showDatePicker()"
            >
              Reschedule Date
            </button>
          </div>
        </div>
      </div>
    </el-dialog>
    <reschedule />
  </div>
</template>

<script>
import moment from 'moment';
import reschedule from './reschedule.vue';
import statusMixin from '../../mixins/status_mixin';
import notificationMxn from '../../mixins/nofication_mixin';

export default {
  components: { reschedule },
  mixins: [statusMixin, notificationMxn],
  watch: {
    '$store.getters.getDetailsDialogVisible': function setDetailsDialogStatus(val) {
      this.visibleDetailsDialog = val;
    },
    visibleDetailsDialog(val) {
      this.$store.commit('setDetailsDialogVisible', val);
    },
  },
  computed: {
    recepientInfo() {
      return this.$store.getters.getData.data.destination;
    },
  },
  data() {
    return {
      visibleDetailsDialog: false,
    };
  },
  methods: {
    showDatePicker() {
      this.$store.commit('setDatePickerVisible', true);
    },
    showUpdateModal() {
      if (moment(new Date(this.$store.getters.getData.data.scheduled_delivery_date))
        .format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        const notification = {
          title: 'Warning',
          level: 2,
          message: 'You will not be able to change the delivery details on the day of the delivery. Kindly reschedule to a later date to edit details',
        };
        this.displayNotification(notification);
      } else {
        this.$store.commit('setDialogVisible', true);
      }
    },
    formatDate(date) {
      return moment(new Date(date)).format('dddd, Do MMMM');
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
}
.change-info-section-divider {
  border: 1px solid #DCDFE6;
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
}
.change-info-data-fields {
  white-space: nowrap;
  overflow: hidden;
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
.recepient {
  line-height: 0;
}
.recipient-details {
  display: flex;
  height: 40px;
  justify-content: flex-start;
  flex-direction: column;
}
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
</style>
