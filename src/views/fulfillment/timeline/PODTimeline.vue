<!-- eslint-disable  -->
<template>
  <div class="pod-timeline-container" v-if="showTimeline">
    <p class="pod-timeline-title">{{$t("timeline.trackDelivery")}}</p>
    <div class="d-flex">
      <p class="el-icon-minusss timeline-pulse-icon"></p>
      <div @click="trackingTimeline = !trackingTimeline" class="pod-timeline-desc mr-5">
        {{$t("timeline.viewProgress")}}
      </div>
      <el-icon class="timeline-arrow-icon" v-if="trackingTimeline"><ArrowDown /></el-icon>
      <el-icon v-else class="timeline-arrow-icon" ><ArrowUp /></el-icon>
    </div>
    <NewTimeline v-if="!trackingTimeline" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { ArrowDown, ArrowUp } from '@element-plus/icons';
import NewTimeline from './newTimeline.vue';

export default {
  name: 'PODTimeline',
  components: { ArrowDown, NewTimeline, ArrowUp },
  data() {
    return {
      trackingTimeline: true,
      showPODTimeline: true,
    };
  },
  computed: {
    ...mapGetters(['getTimelineVisible', 'getData', 'getMobile']),
    showTimeline() {
      if (this.getData.data.order_status === 'ORDER_COMPLETED') {
        return this.getTimelineVisible;
      }
      return !this.getTimelineVisible;
    },
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
.el-icon-minusss {
  background: #324ba8;
  color: #324ba8 !important;
  box-shadow: 0 0 0 0 #324ba8;
  border-radius: 20px;
  animation: pulse-blue 2s infinite;
}
</style>
