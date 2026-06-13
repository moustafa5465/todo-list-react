import { useContext } from "react";
import { SuccessAlert } from "../Contexts/SuccessContext";

export default function SuccessMessage() {
  const { successHandle } = useContext(SuccessAlert);

  return (
    <>
      <div
        className={`fixed bottom-5 right-5 transition-all duration-500 ease-in-out transform
          ${
            successHandle.show == true
              ? "opacity-100 translate-y-0 scale-100" // الشكل لما تظهر
              : "opacity-0 translate-y-10 scale-95 pointer-events-none" // الشكل وهي مختفية
          }`}
      >
        <p
          className={`px-6 py-3 bg-white shadow-2xl rounded-xl font-bold ${
            successHandle.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {successHandle.message}
        </p>
      </div>
    </>
  );
}
