<template>
  <div>
    <h2>Timeline</h2>
    <div class="block">
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
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          content: 'We are Preparing your order',
          color: '#0bbd87',
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
.el-timeline{
  margin-left: 40px;
}
.el-timeline-item{
  padding-right: 40%;
}
</style>
