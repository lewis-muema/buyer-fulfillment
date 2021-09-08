<template>
  <div>
    <h3 class="timeline">Timeline</h3>
    <div class="block mt-3">
      <el-timeline>
        <el-timeline-item
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
.el-timeline-item{
  padding-right: 40%;
}
.block {
  text-align: left;
  margin-left: 50px;
}
.timeline {
  margin-right: 60%;
}
</style>
