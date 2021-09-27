importScripts("https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js");

try{
firebase.initializeApp({
  apiKey: "AIzaSyCgetfUGhkVy1c_QePUgxtyr8vDOvB0Ru4",
  authDomain: "buyer-fulfillment.firebaseapp.com",
  projectId: "buyer-fulfillment",
  storageBucket: "buyer-fulfillment.appspot.com",
  messagingSenderId: "809840261046",
  appId: "1:809840261046:web:173c5b76f2f807c1657317",
  measurementId: "G-7CLVXLT1BW"
});
// Initialize Firebase
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const title = payload.data.username;
  let iconPath = "";

  const options = {
    body: payload.data.message,
    icon: "public/assets/logo.png"
  };

  return self.registration.showNotification(title, options);
});
}
catch(err){
 console.log(err)
}