importScripts("https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js");


try {
  const config = {
    apiKey: "AIzaSyCgetfUGhkVy1c_QePUgxtyr8vDOvB0Ru4",
    authDomain: "buyer-fulfillment.firebaseapp.com",
    projectId: "buyer-fulfillment",
    storageBucket: "buyer-fulfillment.appspot.com",
    messagingSenderId: "809840261046",
    appId: "1:809840261046:web:173c5b76f2f807c1657317",
    measurementId: "G-7CLVXLT1BW"
  };

 firebase.initializeApp(config);
  // Initialize Firebase
  const messaging = firebase.messaging();

  // onBackgroundMessage(messaging(payload) => {
  //   //console.log("[firebase-messaging-sw.js] Received background message ", payload);
  //   // Customize notification here
  //   const notificationTitle = payload.data.title;
  //   const notificationOptions = {
  //     body: payload.data.body,
  //     icon: "public/assets/logo.png"
  //   };
  //   self.registration.showNotification(notificationTitle, notificationOptions);
  // });
  messaging.setBackgroundMessageHandler((payload) => {
    console.log('here again')
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: 'public/assets/logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
} catch (err) {
  console.log(err);
}
