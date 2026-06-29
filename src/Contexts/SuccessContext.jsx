import { createContext, useContext, useRef, useState } from "react";
import SuccessMessage from "../Components/SuccessMessage";


const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });



  const timerRef = useRef(null);
  function showAlert(msg, type) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setAlert({ show: true, message: msg, type: type });
    timerRef.current = setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
      timerRef.current = null;
    }, 2000);
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <SuccessMessage alert={alert} />
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  return useContext(AlertContext);
};
