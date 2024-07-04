import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./modules/Dashboard/Main";

function App() {
  const queryClient = new QueryClient();
  const isOnline = navigator.onLine;

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      // Разрешение на уведомления получено
      console.log("Push уведомления разрешены");
    } else if (permission === "denied") {
      // Разрешение на уведомления отклонено
      console.log("Push уведомления отклонены");
    } else {
      // Пользователь отменил запрос на разрешение уведомлений
      console.log("Запрос на разрешение уведомлений отменен");
    }
  });

  // Получение доступа к сервис-воркеру
  navigator.serviceWorker.ready.then((registration) => {
    // Подписка на push-уведомления
    registration.pushManager
      .subscribe({
        userVisibleOnly: true, // Видимые пользователю уведомления
        applicationServerKey:
          "BDcrCFxXTCEPfdxVhSDekNE0ilhDuPGrPXcR2XnvtV2HUxR4OZYb0TYqkEAjJIilVzf3164ec6N9YZMQtBJlCh8",
      })
      .then((subscription) => {
        // Здесь можно отправить объект подписки на сервер и использовать для отправки уведомлений
        console.log("Успешно подписаны на push уведомления:", subscription);
      })
      .catch((error) => {
        console.error("Ошибка подписки на push уведомления:", error);
      });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Main />
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center p-4 z-50">
            Нет подключения к интернету. Проверьте свое соединение.
          </div>
        )}
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
