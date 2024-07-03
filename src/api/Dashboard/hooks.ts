import { QueryClient } from "react-query";
import { getTodos } from "./DashboardApi";

const queryClient = new QueryClient();

export const useGetTodos = () => {
  const fetchTodos = () => {
    return getTodos().then((data) => {
      queryClient.setQueryData("todos", data); // Устанавливаем данные в кэше react-query
      return data;
    });
  };

  return {
    fetchTodos,
    // getTodos: () => useQuery("todos", fetchTodos),
  };
};
