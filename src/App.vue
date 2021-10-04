<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { getMessaging, getToken } from 'firebase/messaging';

export default {
  data() {
    return {};
  },
  created() {
    try {
      const messaging = getMessaging();
      getToken(messaging, { vapidKey: 'BPgdAI3aB7pNsVM_dzkUzmTRBbuR64GAxAKJvuXWU5J2JIISBvWneZ8gc65Mf8g1uUj4NaVdDWZGsBrx3Y54z3E' })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
          } else {
            console.log(
              'No registration token available. Request permission to generate one.',
            );
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
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
