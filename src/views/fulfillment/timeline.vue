<template>
  <div v-if="$store.getters.getTimelineVisible">
    <h3 :class="!$store.getters.getMobile ? 'timeline-desktop' : 'timeline-mobile'">Timeline</h3>
    <div :class="!$store.getters.getMobile ? 'block mt-3' : 'timeline-events-mobile'">
      <el-timeline>
        <el-timeline-item
          :class="!$store.getters.getMobile ?
            'el-timeline-item-desktop' : ''"
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
        >
          <span
            :class="index + 1 === activities.length
            ? 'active-timeline-text' : ''"
          >
            {{ formatEventName(activity.event_code) }}
          </span>
          <div
            v-if="getStatus([5]).includes($store.getters.getDeliveryStatus)"
            class="timeline-rider"
          >
            <div class="timeline-rider-thumbnail-container">
              <img class="timeline-rider-thumbnail" src="../../assets/rider.png" alt="">
            </div>
            <div>
              <p class="timeline-rider-details">{{ rider.name }}</p>
              <p class="timeline-rider-details">{{ rider.vendor_type }}</p>
              <p class="timeline-rider-details">{{ rider.licensePlateNumber }}</p>
            </div>
            <div>
              <el-button type="primary">
                <i class="el-icon-phone"></i>
                Call
              </el-button>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      activities: [],
      rider: {},
    };
  },
  mounted() {
    this.activities = this.$store.getters.getData.data.event_time_line
      ? this.$store.getters.getData.data.event_time_line : [];
    this.activities.forEach((row, index) => {
      if (this.activities.length === index + 1) {
        this.activities[index].color = '#324ba8';
        this.activities[index].icon = 'el-icon-time';
      } else {
        this.activities[index].icon = 'el-icon-check';
        this.activities[index].color = '#EE7D00';
      }
    });
    this.rider = this.$store.getters.getData.data.partner_contact_information;
  },
  methods: {
    formatEventName(name) {
      let event = name.replace('event.', '');
      event = event.charAt(0).toUpperCase() + event.slice(1);
      return event.replaceAll('.', ' ');
    },
    getStatus(index) {
      const statuses = [];
      this.$store.getters.getOrderStatuses.forEach((row, i) => {
        if (index.includes(i)) {
          statuses.push(row);
        }
      });
      return statuses;
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
}
.timeline-rider-details {
  margin: 5px 0px;
  margin-bottom: 5px !important;
  width: 100px;
}
.trigger-button {
  margin-left: 20px;
}
.active-timeline-text {
  color: #324BA8;
  font-weight: 700;
}
.el-icon-time {
  background: #324ba8;
  color: #324ba8 !important;
  box-shadow: 0 0 0 0 #324ba8;
  border-radius: 20px;
  animation: pulse-blue 2s infinite;
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
