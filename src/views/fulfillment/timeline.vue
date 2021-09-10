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
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
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
      activities: [
        {
          content: 'Order received Mon, August 23rd',
          size: 'large',
          color: '#EE7D00',
          icon: 'el-icon-check',
        },
        {
          content: 'We are Preparing your order',
          color: '#324ba8',
          size: 'large',
        },
        {
          content: 'Your package is on the way',
          size: 'large',
        },
        {
          content: 'Arriving Wednesday',
        },
      ],
    };
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
</style>
