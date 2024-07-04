import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./modules/Dashboard/Main";

function App() {
  const queryClient = new QueryClient();
  const isOnline = navigator.onLine;
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
