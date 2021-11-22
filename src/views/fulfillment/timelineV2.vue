<template>
  <div v-if="$store.getters.getTimelineVisible">
    <h3 :class="!$store.getters.getMobile ? 'timeline-desktop' : 'timeline-mobile'">
      {{ $t("timeline.timeline") }}
    </h3>
    <div :class="!$store.getters.getMobile ? 'block mt-3' : 'timeline-events-mobile'">
      <el-timeline>
        <el-timeline-item
          :class="!$store.getters.getMobile ? 'el-timeline-item-desktop' : ''"
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
        >
          <span :class="activity.active ? 'active-timeline-text' : ''">
            {{
              formatEventName(
                $t(`${$store.getters.getOrderEvents[activity.title]}`, { Date: activity.date })
              )
            }}
          </span>
          <div v-if="activity.showDriver" class="timeline-rider">
            <div class="timeline-rider-thumbnail-container">
              <i class="el-icon-user timeline-rider-thumbnail"></i>
            </div>
            <div v-if="rider">
              <p class="timeline-rider-details">{{ rider.name }}</p>
              <p class="timeline-rider-details">{{ rider.vendor_type }}</p>
              <p class="timeline-rider-details">{{ rider.vehicle_identifier }}</p>
              <p class="timeline-rider-details">{{ rider.phone_number }}</p>
            </div>
          </div>
          <div v-if="$store.getters.getOrderStatuses[8] === activity.event_code"
            class="ml-3 mt-3 mobile-confirmation-pin-container">
            PIN is <span class="mobile-confirmation-pin">{{confirmationPin}}</span>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import statusMixin from '../../mixins/status_mixin';

export default {
  name: 'Timeline',
  mixins: [statusMixin],
  data() {
    return {
      activities: [],
      events: [],
      rider: {},
      timeline: [],
      activeEvent: '',
      activeIndex: 0,
    };
  },
  watch: {
    '$store.getters.getData.data.event_time_line': function refreshTimeline() {
      this.sortTimelineEvents();
    },
  },
  mounted() {
    this.sortTimelineEvents();
  },
  methods: {
    sortTimelineEvents() {
      const timeline = this.$store.getters.getData.data.event_time_line;
      const activeEvent = timeline[timeline.length - 1].event_code;
      this.activeIndex = this.$store.getters.getOrderStatuses
        .findIndex((evt) => evt === activeEvent);
      this.activities = this.filteredEventTimelineV2();
      this.rider = this.$store.getters.getData.data.partner_contact_information;
    },
    filteredEventTimelineV2() {
      const events = [];
      this.$store.getters.getOrderTimelines.forEach((row, index) => {
        if (this.activeIndex === index) {
          row.steps.forEach((step, i) => {
            const evts = this.$store.getters.getData.data.event_time_line.filter(
              (timeline) => timeline.event_code === this.$store.getters.getOrderStatuses[step],
            );
            const evtDate = evts.length > 0 ? evts[evts.length - 1].event_date : '';
            events.push({
              event_code: this.$store.getters.getOrderStatuses[step],
              index,
              active: row.colors[i] === '#324ba8',
              title: row.titles[i],
              color: row.colors[i],
              icon: row.icons[i],
              date: this.formatEventDate(row.dates[i], evtDate),
              showDriver: row.showDriver[i],
            });
          });
        }
      });
      return events;
    },
    formatEventName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    formatEventDate(date, timeline) {
      if (date.status) {
        if (date.type === 'timeline') {
          return moment(timeline).format(date.format);
        }
        if (date.type === 'scheduled') {
          return moment(this.$store.getters.getData.data.scheduled_delivery_date).format(
            date.format,
          );
        }
        if (date.type === 'completed') {
          return moment(this.$store.getters.getData.data.order_completion_date).format(date.format);
        }
        if (date.type === 'today') {
          return 'Today';
        }
      }
      return '';
    },
    formatDate(date) {
      return moment(date).format('ddd, MMM Do');
    },
  },
  computed: {
    ...mapGetters(['getData']),
    confirmationPin() {
      return this.getData.data.confirmation_pin;
    },
  },
};
</script>
<style>
.el-timeline-item-desktop {
  padding-right: 40%;
}
.block {
  text-align: left;
  margin-left: 50px;
}
.timeline-events-mobile {
  margin: 25px 0px;
}
.timeline-desktop {
  margin-right: 60%;
  margin-left: 80px;
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
.timeline-rider {
  display: flex;
  padding: 20px;
  padding: 20px 0px 0px 0px;
}
.timeline-rider-thumbnail-container {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timeline-rider-thumbnail {
  width: 70px;
  height: 70px;
  border: 2px solid #303133;
  border-radius: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timeline-rider-details {
  margin: 5px 0px;
  margin-bottom: 5px !important;
  width: 200px;
}
.trigger-button {
  margin-left: 20px;
}
.active-timeline-text {
  color: #324ba8;
  font-weight: 700;
}
.el-icon-minus {
  background: #324ba8;
  color: #324ba8 !important;
  box-shadow: 0 0 0 0 #324ba8;
  border-radius: 20px;
  animation: pulse-blue 2s infinite;
}
.mobile-confirmation-pin {
  color: #324BA8;
  font-weight: 700;
}
.mobile-confirmation-pin-container {
  background: #F5F5F5;
  width: 104px;
  height: 27px;
  padding: 3px 0px 3px 20px;
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
