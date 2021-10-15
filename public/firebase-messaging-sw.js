/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDAAvZPAgy7HX8JUqxWsFxn28ixGoOnHPs',
  authDomain: 'sendy-fulfilment.firebaseapp.com',
  projectId: 'sendy-fulfilment',
  storageBucket: 'sendy-fulfilment.appspot.com',
  messagingSenderId: '724697801657',
  appId: '1:724697801657:web:69355a1ba4a87949430c68',
  measurementId: 'G-YFWVL6YKF7',
});

const messaging = firebase.messaging();
let notificationData = {};
let orderId;

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('push', event => {
  notificationData = JSON.parse(event.data.text());
  orderId = notificationData.data.order_id;
  const { title } = notificationData.notification;
  const options = {
    body: notificationData.notification.body,
    icon: './favicon.ico',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', event => {
  const { origin } = event.currentTarget.location;
  event.waitUntil(clients.openWindow(`${origin}/${orderId}`));
  event.notification.close();
});

