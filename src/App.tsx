import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";

function App() {
  const isOnline = navigator.onLine;

  if ("serviceWorker" in navigator) {
    console.log("test");
    navigator.serviceWorker.register("/service-worker.js").then(() => {
      console.log("Service worker Registered");
    });
  } else {
    console.warn("Service workers aren't supported in this browser.");
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <h1 className="text-pink">HELLO</h1>

      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center p-4 z-50">
          Нет подключения к интернету. Проверьте свое соединение.
        </div>
      )}
    </ErrorBoundary>
  );
}

export default App;
