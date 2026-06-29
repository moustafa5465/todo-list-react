import { useContext } from "react";
import { DeleteAlert } from "../Contexts/DeleteContext";
import { TodoId, TodosContext } from "../Contexts/TodosContext";
import { useAlert } from "../Contexts/SuccessContext";

export default function DeleteMessage() {
  const { deleteMessage, setDeleteMessage } = useContext(DeleteAlert);
  const { todoId } = useContext(TodoId);
  const { allTodos, setAllTodos } = useContext(TodosContext);
  const { showAlert } = useAlert();

  if (deleteMessage == false) {
    return;
  }

  return (
    <>
      <div className="w-screen h-screen absolute flex  justify-center items-center bg-black/50">
        <div className="w-10/12 sm:w-6/12 lg:w-3/12 flex flex-col gap-3 bg-white p-3 rounded-lg">
          <h2 className="text-xl">هل انت متأكد من رغبتك في حذف المهمة؟</h2>
          <p className="text-gray-600">
            لا يمكنك التراجع عن الحذف في حال اختيار زر (احذف)
          </p>
          <div className="flex gap-2 flex-row justify-end mt-3">
            <button
              onClick={() => {
                if (deleteMessage == true) {
                  setDeleteMessage(false);
                }
              }}
              className="hover:bg-red-800 rounded-md hover:text-white
             text-red-800 hover:cursor-pointer px-3 py-1"
            >
              اغلاق
            </button>
            <button
              onClick={() => {
                const updateTodos = allTodos.filter((e) => e.id !== todoId);
                localStorage.setItem("users", JSON.stringify(updateTodos));
                setAllTodos(updateTodos);
                setDeleteMessage(false);
                showAlert("تم مسح المهمة بنجاح ✅", "success");
              }}
              className="hover:bg-red-800 rounded-md hover:text-white
             text-red-800 hover:cursor-pointer px-3 py-1"
            >
              نعم قم بالحذف
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
