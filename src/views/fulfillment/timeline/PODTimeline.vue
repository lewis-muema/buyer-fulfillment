<!-- eslint-disable  -->
<template>
  <div class="pod-timeline-container">
    <p class="pod-timeline-title">Track Delivery</p>
    <div class="d-flex">
      <p class="el-icon-minus timeline-pulse-icon"></p>
      <div @click="trackingTimeline = !trackingTimeline" class="pod-timeline-desc mr-5">
        View Progress
      </div>
      <el-icon class="timeline-arrow-icon" v-if="trackingTimeline"><ArrowDown /></el-icon>
      <el-icon v-else class="timeline-arrow-icon" ><ArrowUp /></el-icon>
    </div>
    <TrackingTimeline v-if="!trackingTimeline" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { ArrowDown, ArrowUp } from '@element-plus/icons';
import TrackingTimeline from './timelineV2.vue';

export default {
  name: 'PODTimeline',
  components: { ArrowDown, TrackingTimeline, ArrowUp },
  data() {
    return {
      trackingTimeline: true,
      showPODTimeline: true,
    };
  },
  computed: {
    ...mapGetters(['getTimelineVisible', 'getData', 'getMobile']),
  },
  methods: {
    ...mapMutations(['setTimelineVisible']),
  },
};
</script>

<style>
.pod-timeline-container {
  margin: 20px;
}
.pod-timeline-title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
}
.pod-timeline-desc,
.timeline-arrow-icon {
  font-size: 14px;
}
.timeline-pulse-icon {
  box-sizing: border-box;
  height: 10px;
  width: 10px;
  margin: 5px 10px 0px 0px;
}
.timeline-arrow-icon {
  padding-top: 5px;
  margin-left: 5px
}
</style>
