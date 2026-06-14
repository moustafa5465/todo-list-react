import { useContext, useState } from "react";
import { TodoId, TodosContext } from "../Contexts/TodosContext";
import { SuccessAlert } from "../Contexts/SuccessContext";

export default function UpdateModal({ onClose, update }) {
  const { todoId } = useContext(TodoId);
  const { allTodos, setAllTodos } = useContext(TodosContext);
  const { setSuccessHandle } = useContext(SuccessAlert);

  const [updateInputs, setUpdateInputs] = useState({
    title: "",
    details: "",
  });

  if (update == false) {
    return;
  }
  const enterHandel = (e) => {
    if (e.key === "Enter") {
      updateConfirmHandle();
      onClose();
      showAlert("✅ تم التعديل بنجاح", "success");
      setUpdateInputs({
        title: "",
        details: "",
      });
    }
  };

  function updateConfirmHandle() {
    if (
      updateInputs.title.trim() === "" &&
      updateInputs.details.trim() === ""
    ) {
      return;
    }
    const updateTodos = allTodos.map((e) => {
      if (e.id === todoId) {
        return {
          ...e,
          title:
            updateInputs.title.trim() !== "" ? updateInputs.title : e.title,
          details:
            updateInputs.details.trim() !== ""
              ? updateInputs.details
              : e.details,
        };
      } else {
        return e;
      }
    });
    setAllTodos(updateTodos);
    localStorage.setItem("users", JSON.stringify(updateTodos));
    setUpdateInputs({
      title: "",
      details: "",
    });
    onClose();
    showAlert("✅ تم التعديل بنجاح", "success");
  }

  function showAlert(msg, type) {
    setSuccessHandle({ show: true, message: msg, type: type });

    setTimeout(() => {
      setSuccessHandle({ show: false, message: "", type: type });
    }, [2000]);
  }

  return (
    <>
      <div className="w-screen h-screen absolute flex justify-center items-center">
        <div className="z-50 w-10/12 sm:w-6/12 lg:w-3/12 flex flex-col gap-3 bg-white p-3 rounded-lg">
          <p className="text-2xl text-red-600 text-center font-bold">
            تعديل المهمة ✍️
          </p>
          <div className="relative flex-8/12 mt-4">
            <input
              type="text"
              id="task"
              placeholder=" "
              className="peer block w-full border-b-2 border-gray-300 p-2 
              outline-0 bg-transparent text-gray-900 focus:border-blue-600"
              value={updateInputs.title}
              onChange={(e) => {
                setUpdateInputs({ ...updateInputs, title: e.target.value });
              }}
              onKeyDown={enterHandel}
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

          <div className="relative flex-8/12 mt-4">
            <input
              type="text"
              id="task"
              placeholder=" "
              className="peer block w-full border-b-2 border-gray-300 p-2 
              outline-0 bg-transparent text-gray-900 focus:border-blue-600"
              value={updateInputs.details}
              onChange={(e) => {
                setUpdateInputs({ ...updateInputs, details: e.target.value });
              }}
              onKeyDown={enterHandel}
            />

            <label
              htmlFor="task"
              className="absolute right-2 top-2.5 text-gray-500 transition-all duration-300 
              pointer-events-none
              peer-focus:-top-3.5 peer-focus:right-3 peer-focus:text-sm peer-focus:text-blue-600
              peer-focus:translate peer-focus:px-1
              "
            >
              ضع تفاصيل المهمة
            </label>
          </div>

          <div className="flex gap-2 flex-row justify-end mt-3">
            <button
              onClick={() => {
                onClose();
                setUpdateInputs({
                  title: "",
                  details: "",
                });
              }}
              className="hover:bg-red-800 rounded-md hover:text-white
             text-red-800 hover:cursor-pointer px-3 py-1"
            >
              اغلاق
            </button>
            <button
              onClick={() => {
                updateConfirmHandle();
              }}
              className="hover:bg-red-800 rounded-md hover:text-white
             text-red-800 hover:cursor-pointer px-3 py-1"
            >
              تعديل
            </button>
          </div>
        </div>
        <div
          onClick={() => {
            onClose();
            setUpdateInputs({
              title: "",
              details: "",
            });
          }}
          className="z-40 w-screen h-screen absolute flex justify-center items-center bg-black/50"
        ></div>
      </div>
    </>
  );
}
