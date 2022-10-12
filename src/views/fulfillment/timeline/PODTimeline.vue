<!-- eslint-disable  -->
<template>
  <div class="pod-timeline-container">
    <p class="pod-timeline-title">Track Delivery</p>
    <div class="d-flex">
      <p class="el-icon-minus tt"></p>
      <span @click="trackingTimeline = !trackingTimeline" class="pod-timeline-desc mr-5">
        View Progress
        <el-icon class="ordered-items-header-icons"
          ><ArrowDown class="header-arrow-down"
        /></el-icon>
      </span>
    </div>
    <TrackingTimeline v-if="!trackingTimeline" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { ArrowDown } from '@element-plus/icons';
import TrackingTimeline from './timelineV2.vue';

export default {
  name: 'PODTimeline',
  components: { ArrowDown, TrackingTimeline },
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
.pod-timeline-desc {
  font-size: 14px;
}
.tt {
  box-sizing: border-box;
  height: 10px;
  width: 10px;
  margin: 5px 10px 0px 0px;
}
</style>
