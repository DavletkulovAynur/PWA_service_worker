//FIXME: так не работает
// https://dmelo.eu/blog/vite_pwa/
import { precacheAndRoute } from "workbox-precaching";

import { initializeApp } from "firebase/app";
import "firebase/messaging";
import { getMessaging, getToken } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

const firebaseConfig = {
  apiKey: "AIzaSyACprrRLlKeXEqEUJI7mPd1KK5MRAd-Ffs",
  authDomain: "pwa-push-notifications-e9d8e.firebaseapp.com",
  projectId: "pwa-push-notifications-e9d8e",
  storageBucket: "pwa-push-notifications-e9d8e.appspot.com",
  messagingSenderId: "235982055240",
  appId: "1:235982055240:web:09d52b2f74f1dc554e357d",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

getToken(messaging, {
  vapidKey:
    "BDcrCFxXTCEPfdxVhSDekNE0ilhDuPGrPXcR2XnvtV2HUxR4OZYb0TYqkEAjJIilVzf3164ec6N9YZMQtBJlCh8",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log("currentToken", currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Проверяем, есть ли уведомление в payload
  if (payload.notification) {
    const notificationTitle = payload.notification.title || "Default Title";
    const notificationOptions = {
      body: payload.notification.body || "Default Body",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  } else {
    console.log("[firebase-messaging-sw.js] No notification payload");
  }
});
