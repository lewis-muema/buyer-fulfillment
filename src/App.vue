<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import noficationMixin from './mixins/nofication_mixin';

export default {
  // eslint-disable-next-line camelcase
  mixins: [noficationMixin],
  data() {
    return {};
  },
  created() {
    try {
      const messaging = getMessaging();
      getToken(messaging, {
        vapidKey: process.env.VAPIDKEY,
      }).then((currentToken) => {
        if (currentToken) {
          // ...
          const deviceId = Math.floor(new Date().getTime());
          localStorage.deviceId = localStorage.deviceId ? localStorage.deviceId : deviceId;
          this.$store.dispatch('requestAxiosPut', {
            app: process.env.FULFILMENT_SERVER,
            endpoint: `buyer/orders/${this.$route.params.deliveryId}/fcm`,
            values: {
              token: currentToken,
              device_id: localStorage.deviceId,
            },
          });
        }
      });
      onMessage(messaging, (payload) => {
        const notification = {
          title: `${payload.notification.title}`,
          level: 1,
          message: payload.notification.body,
        };
        this.displayNotification(notification);
        this.$store.dispatch('requestAxiosGet', {
          app: process.env.FULFILMENT_SERVER,
          endpoint: `buyer/orders/${this.$route.params.deliveryId}`,
        }).then((response) => {
          this.$store.commit('setData', response.data);
          this.$store.commit('setDeliveryStatus', response.data.data.order_event_status);
        });
      });
    } catch (error) {
      // ...
    }
  },
};
</script>

<style>
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
