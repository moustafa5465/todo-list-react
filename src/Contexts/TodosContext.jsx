import { createContext, useContext, useState } from "react";

const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [allTodos, setAllTodos] = useState([]);

  return (
    <>
      <TodosContext value={{ allTodos, setAllTodos }}>{children}</TodosContext>
    </>
  );
}

export const useTodo = () => {
  return useContext(TodosContext);
};
