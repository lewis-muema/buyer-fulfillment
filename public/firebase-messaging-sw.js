
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw"

try {
 const messaging = getMessaging();
  onBackgroundMessage(messaging,(payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
} catch (err) {
  console.log(err);
}
