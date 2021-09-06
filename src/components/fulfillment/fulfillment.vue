<template>
  <div>
    <Header />
    <el-button @click="showNotification()">Show</el-button>
  </div>
</template>

<script>
import Header from '../../views/fulfillment/header.vue';
import NotificationMxn from '../../mixins/nofication_mixin';

export default {
  name: 'fulfillment',
  mixins: [NotificationMxn],
  components: {
    Header,
  },
  data() {
    return {
      data: '',
    };
  },
  mounted() {},
  methods: {
    showNotification() {
      const notification = {
        title: 'test',
        level: 1,
        message: 'test',
      };
      this.displayNotification(notification);
    },
  },
};
</script>

<style>

</style>
