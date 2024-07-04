// sw.ts
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;

// //TODO: нужно ли это???
self.skipWaiting();
clientsClaim();
// // *** //

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

// TEST
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.", event);
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching: test", event.request.url);
});

// Получение push уведомлений
self.addEventListener("push", (event) => {
  console.log("Push event received:", event);

  // Получение данных уведомления
  if(!event.data) return;
  const data = event.data.json();
  console.log("Notification data:", data);

  // Выведите нужные данные или обработайте уведомление здесь
  // Например, отобразите уведомление с использованием Notification API
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      // другие опции уведомления
    })
  );
});
