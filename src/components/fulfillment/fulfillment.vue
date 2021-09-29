<template>
  <div>
    <Mobile v-if="$store.getters.getMobile" />
    <Desktop v-else />
  </div>
</template>

<script>
import NotificationMxn from '../../mixins/nofication_mixin';
import eventsMixin from '../../mixins/events_mixin';
import Desktop from './components/desktop.vue';
import Mobile from './components/mobile.vue';

export default {
  name: 'fulfillment',
  components: {
    Desktop,
    Mobile,
  },
  mixins: [NotificationMxn, eventsMixin],
  data() {
    return {
      data: '',
    };
  },
  mounted() {
    window.addEventListener('freshchat-loaded', () => {
      this.sendSegmentEvents({
        event: 'Select Help Chat',
        data: {
          userId: this.$store.getters.getData.data.recipientContactInformation.customer_name,
        },
      });
    });
    this.isMobile();
    window.onresize = (() => {
      this.isMobile();
    });
  },
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
      if (
        navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
      ) {
        this.$store.commit('setMobile', true);
      } else {
        this.$store.commit('setMobile', false);
      }
    },
  },
};
</script>

<style></style>
