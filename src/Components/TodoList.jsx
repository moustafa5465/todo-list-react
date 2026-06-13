import { useEffect, useState, useRef } from "react";
import Mission from "./Mission";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { TodosContext } from "../Contexts/TodosContext";
import DeleteMessage from "./DeleteMessage";
import SuccessMessage from "./SuccessMessage";
import { SuccessAlert } from "../Contexts/SuccessContext";
import UpdateModal from "./UpdateModal";

export default function TodoList() {
  // Context
  const { allTodos, setAllTodos } = useContext(TodosContext);
  const { setSuccessHandle } = useContext(SuccessAlert);
  // Styles
  const active = "text-red-700 bg-red-100";
  const regular = "px-2 py-1 border border-gray-300 rounded-sm cursor-pointer";

  // useStates
  const [filter, setFilter] = useState("all");
  const [todoTitle, setTodoTitle] = useState("");
  const [updateMessage, setUpdateMessage] = useState(false);

  function updateOpenHandel() {
    setUpdateMessage(true);
  }
  function updateCloseHandel() {
    setUpdateMessage(false);
  }

  function showAlert(msg, type) {
    setSuccessHandle({ show: true, message: msg, type: type });

    setTimeout(() => {
      setSuccessHandle({ show: false, message: "", type: type });
    }, [2000]);
  }

  useEffect(() => {
    const updateTodos = JSON.parse(localStorage.getItem("users")) || [];
    setAllTodos(updateTodos);
  }, []);

  const listRef = useRef();

  function todoBtn(e) {
    e.preventDefault();
    if (todoTitle === "") {
      showAlert("يجب ان تكتب شيئا ❌", "error");
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title: todoTitle,
      details: "",
      isCompleted: false,
    };
    const updateTodos = [...allTodos, newTodo];

    setAllTodos(updateTodos);

    localStorage.setItem("users", JSON.stringify(updateTodos));

    setTodoTitle("");

    showAlert("تم اضافة المهمة بنجاح ✅", "success");

    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }

  const filteredTodos = allTodos.filter((todo) => {
    if (filter === "done") {
      return todo.isCompleted === true;
    }
    if (filter === "undone") {
      return todo.isCompleted === false;
    }
    return true;
  });

  const todosElements = filteredTodos.map((m) => {
    return <Mission key={m.id} todo={m} updateHandel={updateOpenHandel} />;
  });

  return (
    <>
      <div className="bg-white rounded-sm xl:w-4/12 md:w-6/12 p-3">
        <h1
          className="pt-3 pb-4 text-center font-bold text-7xl flex flex-col justify-center items-center
        relative before:absolute before:w-full before:h-px before:rounded-1lg before:bg-gray-300 before:bottom-0"
        >
          مهامي
        </h1>
        <div className="grid grid-cols-3 text-center my-5">
          <button
            onClick={() => setFilter("all")}
            className={`${regular} ${filter === "all" ? active : regular}`}
          >
            الكل
          </button>

          <button
            onClick={() => setFilter("done")}
            className={`${regular} ${filter === "done" ? active : regular}`}
          >
            المهام المنجزة
          </button>

          <button
            onClick={() => setFilter("undone")}
            className={`${regular} ${filter === "undone" ? active : regular}`}
          >
            المهام غير المنجزة
          </button>
        </div>
        <div
          ref={listRef}
          className="flex flex-col gap-y-5 overflow-y-auto max-h-[40vh] scroll-bar-custom"
        >
          {todosElements}
        </div>
        <form
          onSubmit={todoBtn}
          className="flex flex-row gap-3 items-center mt-6 lg:flex-nowrap sm:flex-wrap"
        >
          <div className="relative flex-8/12">
            <input
              type="text"
              id="task"
              placeholder=" "
              className="peer block w-full border-b-2 border-gray-300 p-2 
              outline-0 bg-transparent text-gray-900 focus:border-blue-600"
              value={todoTitle}
              onChange={(e) => {
                setTodoTitle(e.target.value);
              }}
            />

            <label
              htmlFor="task"
              className="absolute right-2 top-2.5 text-gray-500 transition-all duration-300 
              pointer-events-none
              peer-focus:-top-3.5 peer-focus:right-3 peer-focus:text-sm peer-focus:text-blue-600
              peer-focus:translate peer-focus:px-1
              "
            >
              ضع عنوان المهمة
            </label>
          </div>
          <button
            className="flex-4/12 p-2 bg-red-800 rounded-sm text-white
            font-bold text-xl hover:cursor-pointer"
            type="submit"
          >
            اضافة
          </button>
        </form>
      </div>
      <SuccessMessage />
      <UpdateModal update={updateMessage} onClose={updateCloseHandel} />
      <DeleteMessage />
    </>
  );
}
