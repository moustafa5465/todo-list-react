import "./App.css";
import TodoList from "./Components/TodoList";
import { useState } from "react";
import { TodoId, TodosContext } from "./Contexts/TodosContext";
import { DeleteAlert } from "./Contexts/DeleteContext";
import { AlertProvider } from "./Contexts/SuccessContext";
import AnimatedBackground from "./Components/animation/AnimatedBackground";

export default function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [todoId, setTodoId] = useState();

  return (
    <>
      <AnimatedBackground>
        <TodosContext.Provider value={{ allTodos, setAllTodos }}>
          <TodoId.Provider value={{ todoId, setTodoId }}>
            <DeleteAlert.Provider value={{ deleteMessage, setDeleteMessage }}>
              <AlertProvider>
                <TodoList />
              </AlertProvider>
            </DeleteAlert.Provider>
          </TodoId.Provider>
        </TodosContext.Provider>
      </AnimatedBackground>
    </>
  );
}
