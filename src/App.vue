<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import noficationMixin from './mixins/nofication_mixin';
import eventsMixin from './mixins/events_mixin';

export default {
  // eslint-disable-next-line camelcase
  mixins: [noficationMixin, eventsMixin],
  data() {
    return {};
  },
  created() {
    window.addEventListener('register-fcm', () => {
      try {
        initializeApp({
          apiKey: 'AIzaSyDAAvZPAgy7HX8JUqxWsFxn28ixGoOnHPs',
          authDomain: 'sendy-fulfilment.firebaseapp.com',
          projectId: 'sendy-fulfilment',
          storageBucket: 'sendy-fulfilment.appspot.com',
          messagingSenderId: '724697801657',
          appId: '1:724697801657:web:69355a1ba4a87949430c68',
          measurementId: 'G-YFWVL6YKF7',
        });
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('firebase-messaging-sw.js');
          });
        }
        const messaging = getMessaging();
        getToken(messaging, {
          vapidKey: process.env.VAPIDKEY,
        }).then((currentToken) => {
          if (currentToken) {
          // ...
            const deviceId = Math.floor(new Date().getTime());
            let device = '';
            if (this.getCookie('deviceId')) {
              device = this.getCookie('deviceId');
            } else {
              this.setCookie('deviceId', deviceId, 365);
              device = this.getCookie('deviceId');
            }
            localStorage.deviceId = localStorage.deviceId ? localStorage.deviceId : deviceId;
            this.$store.dispatch('requestAxiosPut', {
              app: process.env.FULFILMENT_SERVER,
              endpoint: `buyer/orders/${this.$store.getters.getData.data.order_id}/fcm`,
              values: {
                token: currentToken,
                device_id: device,
              },
            });
          }
        });
        onMessage(messaging, (payload) => {
          this.sendSegmentEvents({
            event: 'Trigger for User',
            data: {
              userId: this.$store.getters.getData.data.destination.name,
              // eslint-disable-next-line max-len
              trigger: payload.notification.body,
            },
          });
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
    });
  },
  methods: {
    setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `${cname}=${cvalue};${expires};path=/`;
    },
    getCookie(cname) {
      const name = `${cname}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
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
