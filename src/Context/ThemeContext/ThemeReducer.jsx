const TOGGLE_THEME = "TOGGLE_THEME";

function ThemeReducer(state, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    default:
      return state;
  }
};

export default ThemeReducer;
