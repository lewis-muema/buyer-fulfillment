<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { getMessaging, getToken } from 'firebase/messaging';
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
          localStorage.deviceId = deviceId;
          this.$store.dispatch('requestAxiosPut', {
            app: process.env.FULFILMENT_SERVER,
            endpoint: `buyer/orders/${this.$route.params.deliveryId}/fcm`,
            values: {
              token: currentToken,
              device_id: deviceId,
            },
          });
        }
      });
      messaging.onMessage((payload) => {
        console.log('onMessage', payload);
        const notification = {
          title: 'Notification Recieved',
          level: 1,
          message: '',
        };
        this.displayNotification(notification);
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
