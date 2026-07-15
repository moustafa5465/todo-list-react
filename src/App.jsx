import "./App.css";
import TodoList from "./Components/TodoList";
import { TodosProvider } from "./Contexts/TodosContext";
import { AlertProvider } from "./Contexts/SuccessContext";
import AnimatedBackground from "./Components/animation/AnimatedBackground";

export default function App() {
  return (
    <>
      <AnimatedBackground>
        <TodosProvider>
          <AlertProvider>
            <TodoList />
          </AlertProvider>
        </TodosProvider>
      </AnimatedBackground>
    </>
  );
}
