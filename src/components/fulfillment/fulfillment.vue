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
  title: 'Buyer Fulfilment',
  name: 'Fulfillment-App',
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
        event: 'Select_help_chat',
        data: {
          userId: this.$store.getters.getData.data.destination.name,
        },
      });
    });
    window.addEventListener('freshchat-initialized', () => {
      if (this.$store.getters.getData) {
        window.fcWidget.user.setProperties({
          firstName: this.$store.getters.getData.data.destination.name,
          phone: this.$store.getters.getData.data.destination.phone_number,
          phoneCountry: this.$store.getters.getCountryData.country,
        });
      }
    });
    window.addEventListener('country-fetched', (event) => {
      this.$store.commit('setCountryData', event.detail);
    });
    this.isMobile();
    window.onresize = (() => {
      this.isMobile();
    });
    this.getDeliveryDetails();
    this.poll();
  },
  methods: {
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
      } else {
        this.$store.commit('setMobile', false);
      }
    },
    getDeliveryDetails() {
      if (this.$route.params.deliveryId) {
        this.$store.dispatch('requestAxiosGet', {
          app: process.env.FULFILMENT_SERVER,
          endpoint: `buyer/orders/${this.$route.params.deliveryId}`,
        }).then((response) => {
          localStorage.setItem('OrderNo', response.data.data.order_id);
          this.$store.commit('setData', response.data);
          this.$store.commit('setDeliveryStatus', response.data.data.order_event_status);
          window.dispatchEvent(new CustomEvent('language-changed', { detail: response.data.data.language }));
          window.dispatchEvent(new CustomEvent('register-fcm'));
        });
      }
    },
  },
};
</script>

<style></style>
