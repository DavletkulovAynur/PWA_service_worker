import { FC } from "react";
import { useGetTodos } from "../../api/Dashboard";

const Main: FC = () => {
  const { fetchTodos } = useGetTodos();

  const handleClick = () => {
    fetchTodos();
  };

  return (
    <div>
      <button onClick={handleClick}>Загрузить данные</button>
      <div>Main</div>
    </div>
  );
};

export default Main;
