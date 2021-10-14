import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

try {
  const messaging = getMessaging();
  onBackgroundMessage(messaging, (payload) => {
    console.log(payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
// eslint-disable-next-line no-empty
} catch (err) {}
