<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>

import firebase from 'firebase/app';
import 'firebase/messaging';

export default {
  data() {
    return {};
  },
  created() {
    try {
      firebase.messaging()
        .requestPermission().then(() => {
          console.log('notificationn permission granted');
          return firebase.messaging().getToken().then((token) => {
            window.console.log(token);
          });
        }).catch((err) => {
          console.log(`unable to get the token${err}`);
        });
    } catch (error) {
      console.log(error);
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
