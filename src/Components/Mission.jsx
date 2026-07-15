import { Check, Pencil, Trash2 } from "lucide-react";
import { useTodo } from "../Contexts/TodosContext";
import { useAlert } from "../Contexts/SuccessContext";

export default function Mission({ todo, updateHandel, deleteHandel, todoId }) {
  const { allTodos, setAllTodos } = useTodo();
  const { showAlert } = useAlert();

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row justify-center sm:justify-between flex-wrap sm:flex-nowrap items-center bg-blue-900 p-3 py-4 rounded-sm hover:py-9">
        <div className="flex-7/12 flex flex-col">
          <h3
            className={`text-white font-bold text-center sm:text-right text-2xl ${todo.isCompleted ? "line-through" : "no-underline"}`}
          >
            {todo.title}
          </h3>
          <p
            className={`text-gray-400 text-center sm:text-right text-lg ${todo.isCompleted ? "line-through" : "no-underline"}`}
          >
            {todo.details}
          </p>
        </div>

        <div className="flex-5/12 gap-3 flex flex-row justify-end items-center">
          <button
            onClick={() => {
              const todoStatus = allTodos.map((t) => {
                if (t.id == todo.id) {
                  if (t.isCompleted == false) {
                    t.isCompleted = true;
                  } else {
                    t.isCompleted = false;
                  }
                  if (t.isCompleted == true) {
                    showAlert("تم الانجاز بنجاح 🎉", "success");
                  } else if (t.isCompleted == false) {
                    showAlert("تم الغاء الانجاز ❌", "error");
                  }
                }
                return t;
              });
              setAllTodos(todoStatus);
              localStorage.setItem("users", JSON.stringify(todoStatus));
            }}
            className={`group border-2 rounded-full border-green-500 bg-white p-2 
          hover:bg-green-200 hover:cursor-pointer ${todo.isCompleted == true ? "bg-green-500!" : "bg-white!"}`}
          >
            <Check
              className={`stroke-green-500 group-hover:stroke-white 
            ${todo.isCompleted == true ? "stroke-white!" : "stroke-green-500!"} `}
            />
          </button>
          <button
            onClick={() => {
              updateHandel();
              todoId(todo.id);
            }}
            className="group border-2 rounded-full border-blue-800 bg-white p-2 hover:bg-blue-300 hover:cursor-pointer"
          >
            <Pencil className="stroke-blue-900 group-hover:stroke-white" />
          </button>
          <button
            onClick={() => {
              deleteHandel();
              todoId(todo.id);
            }}
            className="group border-2 rounded-full border-red-700 bg-white p-2 hover:bg-red-300 hover:cursor-pointer"
          >
            <Trash2 className="stroke-red-700 group-hover:stroke-white" />
          </button>
        </div>
      </div>
    </>
  );
}
