<template>
  <div>
    <Mobile v-if="isMobile()" />
    <Desktop v-else />
    <el-button @click="showNotification()">Show</el-button>
  </div>
</template>

<script>
import Desktop from './components/desktop.vue';
import Mobile from './components/mobile.vue';
import NotificationMxn from '../../mixins/nofication_mixin';

export default {
  name: 'fulfillment',
  components: {
    Desktop,
    Mobile,
  },
  mixins: [NotificationMxn],
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
    isMobile() {
      if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>

</style>
