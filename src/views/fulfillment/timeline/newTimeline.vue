<template lang="">
  <div>
    <div v-if="$store.getters.getTimelineVisible">
      <h3 :class="!$store.getters.getMobile ? 'timeline-desktop' : 'timeline-mobile'">
        {{ podOrder ? "" : $t("timeline.timeline") }}
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
            <span>
              {{ activity.translated_event_code }}
            </span>
            <!-- <span
              :class="
                activity.active
                  ? 'active-timeline-text'
                  : activity.event_code === 'event.delivery.failed'
                  ? 'failed-delivery-timeline-text'
                  : activity.title === 18 && !activity.active
                  ? 'inactive-timeline-text'
                  : ''
              "
            >
              {{
                formatEventName(
                  $t(`${$store.getters.getOrderEvents[activity.title]}`, {
                    Date: activity.date,
                  })
                )
              }}
            </span> -->
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
import eventsMixin from '../../../mixins/events_mixin';

export default {
  name: 'NewTimeline',
  mixins: [eventsMixin],
  data() {
    return {
      closeIcon: shallowRef(Close),
    };
  },
  computed: {
    ...mapGetters(['getData']),
    rider() {
      return this.$store.getters.getData.data.partner_contact_information;
    },
    activities() {
      return this.$store.getters.getData.data.summarised_event_time_line;
    },
    confirmationPin() {
      return this.$store.getters.getData.data.confirmation_pin;
    },
    getLanguage() {
      return this.$store.getters.getData.data.language;
    },
    showOTP() {
      return this.$store.getters.getData.data.sale_of_goods_invoice === null
        ? this.getStatus([8]).includes(this.$store.getters.getDeliveryStatus)
        : this.$store.getters.getData.data.sale_of_goods_invoice.invoice_status
            === 'INVOICE_COMPLETELY_PAID';
    },
    podOrder() {
      return this.$store.getters.getData.data.sale_of_goods_invoice !== null;
    },
  },
  methods: {
    ...mapMutations(['setDatePickerVisible']),
    showDatePicker() {
      this.$store.commit('setDatePickerVisible', true);
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
</style>
