/* global firebase */

/* eslint-disable */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
/* eslint-enable */

import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyACprrRLlKeXEqEUJI7mPd1KK5MRAd-Ffs",
  authDomain: "pwa-push-notifications-e9d8e.firebaseapp.com",
  projectId: "pwa-push-notifications-e9d8e",
  storageBucket: "pwa-push-notifications-e9d8e.appspot.com",
  messagingSenderId: "235982055240",
  appId: "1:235982055240:web:09d52b2f74f1dc554e357d"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});