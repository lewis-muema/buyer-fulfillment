<template lang="">
  <div>
    <div v-if="showTimeline"
    :class="!$store.getters.getMobile ? 'timeline-desktop-container' : ''">
      <h3 :class="!$store.getters.getMobile ? 'timeline-desktop' : 'timeline-mobile'">
        {{ podTimelineTitle ? "" : $t("timeline.timeline") }}
      </h3>
      <div :class="!$store.getters.getMobile ? 'block mt-3' : 'timeline-events-mobile'">
        <el-timeline :class="!$store.getters.getMobile ? 'el-timeline-item-desktop' : ''">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="
              activity.event_code === 'EVENT_DELIVERY_FAILED'
                ? '#9b101c'
                : $store.getters.getTimelineIcons[activity.event_tense].color
            "
            :icon="
              activity.event_code === 'EVENT_DELIVERY_FAILED'
                ? closeIcon
                : $store.getters.getTimelineIcons[activity.event_tense].icon
            "
            :hollow="$store.getters.getTimelineIcons[activity.event_tense].hollow"
            :class="$store.getters.getTimelineIcons[activity.event_tense].iconClass"
          >
          <span :class="
              activity.event_code === 'EVENT_DELIVERY_FAILED'
                ? 'failed-delivery-timeline-text'
                : `${activity.event_tense}-timeline-text`
            ">
             <span>
              {{ formatStatus(activity.event_code, activity) }}
            </span>
            </span>
            <div
              v-if="
                activity.event_code === 'EVENT_DELIVERY_PARTNER_ARRIVED_AT_BUYER_LOCATION' &&
                activity.event_tense === 'PAST'
              "
              class="timeline-rider"
            >
              <div class="timeline-rider-thumbnail-container">
                <i class="el-icon-user timeline-rider-thumbnail"></i>
              </div>
              <div v-if="rider">
                <p class="timeline-rider-details">{{ rider.name }}</p>
                <p class="timeline-rider-details">{{ rider.vendor_type }}</p>
                <p class="timeline-rider-details">
                  {{ rider.vehicle_identifier }}
                </p>
                <p class="timeline-rider-details">{{ rider.phone_number }}</p>
              </div>
            </div>
            <div
              v-if="
                activity.event_code === 'EVENT_DELIVERY_FAILED' && activity.event_tense === 'PAST'
              "
            >
              <el-button class="timeline-reschedule" @click="showDatePicker()">
                <i class="el-icon-date timeline-reschedule-date"></i>
                {{ $t("desktop.rescheduleDelivery") }}
              </el-button>
            </div>
          </el-timeline-item>
        </el-timeline>
        <div class="d-flex mobile-confirmation-pin-container" v-if="showOTP">
          <img
            src="../../../assets/keypad.png"
            class="img-fluid mobile-confirmation-pin-img"
            alt="keypad"
          />
          <div class="mobile-confirmation-pin-text">
            {{ $t("timeline.pin") }}
            <span class="mobile-confirmation-pin">{{ confirmationPin }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { shallowRef } from 'vue';
import { Close } from '@element-plus/icons';
import eventsMixin from '../../../mixins/status_mixin';
import formatStatusMixin from '../../../mixins/formatStatus_Mixin';

export default {
  name: 'NewTimeline',
  mixins: [eventsMixin, formatStatusMixin],
  data() {
    return {
      closeIcon: shallowRef(Close),
    };
  },
  computed: {
    ...mapGetters(['getData', 'getMobile', 'getTimelineVisible']),
    rider() {
      return this.getData.data.partner_contact_information !== null ? this.getData.data.partner_contact_information : '';
    },
    activities() {
      return this.getData.data.summarised_event_time_line;
    },
    confirmationPin() {
      return this.getData.data.confirmation_pin;
    },
    getLanguage() {
      return this.getData.data.language;
    },
    showOTP() {
      return this.$store.getters.getData.data.sale_of_goods_invoice === null
        ? this.getStatus([8]).includes(this.$store.getters.getDeliveryStatus)
        : this.$store.getters.getData.data.sale_of_goods_invoice.invoice_status
            === 'INVOICE_COMPLETELY_PAID';
    },
    showTimeline() {
      if (this.getData.data.order_status === 'ORDER_COMPLETED') {
        return this.getTimelineVisible;
      }
      return !this.getTimelineVisible;
    },
    podTimelineTitle() {
      return this.$store.getters.getData.data.sale_of_goods_invoice !== null
      && this.getMobile;
    },
    timelineStyling() {
      return !this.getMobile
      && this.getStatus([8, 9, 10, 11, 12]).includes(this.$store.getters.getDeliveryStatus);
    },
  },
  methods: {
    ...mapMutations(['setDatePickerVisible']),
    showDatePicker() {
      this.$store.commit('setDatePickerVisible', true);
    },
    formatStatus(status, item) {
      const newStatus = status.toLowerCase();
      return this.showEventLabels(newStatus, item);
    },
  },
};
</script>
<style>
.el-icon-minuss .el-timeline-item__node--normal .el-timeline-item__icon {
  background: #324ba8;
  color: #324ba8 !important;
  box-shadow: 0 0 0 0 #324ba8;
  border-radius: 20px;
  animation: pulse-blue 2s infinite;
}
.failed-delivery-timeline-text {
  color: #9b101c;
}
.past-timeline-text {
  color: #303133;
}
.present-timeline-text {
  color: #324ba8;
  font-weight: 700;
}
.timeline-mobile {
  margin: 10px 20px;
  color: #606266;
  text-transform: uppercase;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 1.5px;
  text-align: left;
}
.timeline-events-mobile {
  margin: 25px 0px;
}
.mobile-confirmation-pin-container {
  background: #f5f5f5;
  width: max-content;
  height: 35px;
  margin-left: 50px;
  margin-top: -20px;
  padding: 7px 10px 7px 10px;
}
.mobile-confirmation-pin-img {
  margin-top: 2px;
}
.mobile-confirmation-pin-text {
  padding-left: 10px;
}
.mobile-confirmation-pin {
  color: #324ba8;
  font-weight: 700;
}
@keyframes pulse-blue {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 #324ba8;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}
</style>
