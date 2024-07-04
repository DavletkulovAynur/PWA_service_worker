// sw.js
import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("message", (event) => {
  console.log("message", event);
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// self.addEventListener("fetch", (event) => {
//   console.log("message fetch", event);
// });

self.addEventListener("fetch", function () {
  // console.log('[Service Worker] Push Received.');
  // const payload = event.data.json();  // Assuming the payload is sent as JSON
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //     body: payload.notification.body,
  //     icon: payload.notification.icon,
  //     image: payload.notification.image,
  //     badge: payload.notification.badge,
  // };
  // event.waitUntil(
  //     self.registration.showNotification(, notificationOptions)
  // );
  console.log("timeout");
  setTimeout(() => {
    self.registration.showNotification("test", {
      body: "test",
    });
  }, 3000);
});

//TODO: FIREBASE
console.log("firebase");
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: "AIzaSyACprrRLlKeXEqEUJI7mPd1KK5MRAd-Ffs",
  authDomain: "pwa-push-notifications-e9d8e.firebaseapp.com",
  projectId: "pwa-push-notifications-e9d8e",
  storageBucket: "pwa-push-notifications-e9d8e.appspot.com",
  messagingSenderId: "235982055240",
  appId: "1:235982055240:web:09d52b2f74f1dc554e357d",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
console.log("messaging", messaging);

messaging
  .getToken({
    vapidKey:
      "BDcrCFxXTCEPfdxVhSDekNE0ilhDuPGrPXcR2XnvtV2HUxR4OZYb0TYqkEAjJIilVzf3164ec6N9YZMQtBJlCh8",
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log("Current token:", currentToken);
      // Send the token to your server and update the UI if necessary
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
