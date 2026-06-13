import { Check, Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { TodosContext, TodoId } from "../Contexts/TodosContext";
import { DeleteAlert } from "../Contexts/DeleteContext";
import { SuccessAlert } from "../Contexts/SuccessContext";

export default function Mission({ todo, updateHandel }) {
  const { allTodos, setAllTodos } = useContext(TodosContext);
  const { setDeleteMessage } = useContext(DeleteAlert);
  const { setTodoId } = useContext(TodoId);
  const { setSuccessHandle } = useContext(SuccessAlert);

  function showAlert(msg, type) {
    setSuccessHandle({ show: true, message: msg, type: type });

    setTimeout(() => {
      setSuccessHandle({ show: false, message: "", type: type });
    }, [2000]);
  }

  return (
    <>
      <div className="flex flex-row flex-wrap sm:flex-nowrap items-center bg-blue-900 p-3 py-4 rounded-sm hover:py-9">
        <div className="flex-7/12 flex flex-col">
          <h3
            className={`text-white font-bold text-2xl ${todo.isCompleted ? "line-through" : "no-underline"}`}
          >
            {todo.title}
          </h3>
          <p
            className={`text-gray-400 text-lg ${todo.isCompleted ? "line-through" : "no-underline"}`}
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
                    showAlert("تم الغاء الانجاز ✅", "success");
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
              setTodoId(todo.id);
            }}
            className="group border-2 rounded-full border-blue-800 bg-white p-2 hover:bg-blue-300 hover:cursor-pointer"
          >
            <Pencil className="stroke-blue-900 group-hover:stroke-white" />
          </button>
          <button
            onClick={() => {
              setTodoId(todo.id);
              setDeleteMessage(true);
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
