import ThemeContext from "./ThemeContext";
import { useReducer } from "react";
import ThemeReducer from "./ThemeReducer";

function ThemeProvider({children}) {
  const initialState = localStorage.getItem("theme") || "dark";

  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  return (
    <ThemeContext.Provider value={{state, dispatch}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;