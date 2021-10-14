<template>
  <div v-if="Object.keys(this.$store.getters.getData).length > 0">
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
          userId: this.$store.getters.getData.data.destination.name,
        },
      });
    });
    this.isMobile();
    window.onresize = (() => {
      this.isMobile();
    });
    this.getDeliveryDetails();
    this.poll();
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
    poll() {
      setInterval(() => {
        this.getDeliveryDetails();
      }, 900000);
    },
    isMobile() {
      if (
        navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
      ) {
        this.$store.commit('setMobile', true);
        this.$store.commit('setRecipientVisible', this.$store.getters.getTimelineVisible);
      } else {
        this.$store.commit('setMobile', false);
        this.$store.commit('setRecipientVisible', true);
      }
    },
    getDeliveryDetails() {
      if (this.$route.params.deliveryId) {
        localStorage.fulfilmentOrderNo = this.$route.params.deliveryId;
        this.$store.dispatch('requestAxiosGet', {
          app: process.env.FULFILMENT_SERVER,
          endpoint: `buyer/orders/${this.$route.params.deliveryId}`,
        }).then((response) => {
          this.$store.commit('setData', response.data);
          this.$store.commit('setDeliveryStatus', response.data.data.order_event_status);
        });
      }
    },
  },
};
</script>

<style></style>
