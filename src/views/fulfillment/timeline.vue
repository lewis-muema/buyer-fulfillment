<template>
  <div>
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
          {{ activity.message }}
          <div v-if="$store.getters.getDeliveryStatus === 2 && index === 2" class="timeline-rider">
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
      <el-button class="trigger-button" type="primary" @click="changeDeliveryStatus()">
        Trigger for Dorcas
      </el-button>
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
    this.activities = this.$store.getters.getData.data.eventTimeline
      ? this.$store.getters.getData.data.eventTimeline : [];
    this.activities[this.$store.getters.getDeliveryStatus + 1].color = '#324ba8';
    this.activities[this.$store.getters.getDeliveryStatus].icon = 'el-icon-check';
    this.activities[this.$store.getters.getDeliveryStatus].color = '#EE7D00';
    this.rider = this.$store.getters.getData.data.partnerContactInformation;
  },
  watch: {
    '$store.getters.getDeliveryStatus': function setDeliveryStatus(val) {
      if (val < this.activities.length - 1) {
        this.activities[val + 1].color = '#324ba8';
      }
      if (val < this.activities.length) {
        this.activities[val].icon = 'el-icon-check';
        this.activities[val].color = '#EE7D00';
      }
    },
  },
  methods: {
    changeDeliveryStatus() {
      this.$store.commit('setDeliveryStatus', this.$store.getters.getDeliveryStatus + 1);
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
</style>
