import { createContext, React, useContext } from "react";
import ReactDOM from "react-dom/client";

export const GoalContext = createContext();

export const  useGoal = () => {
  const context = useContext(GoalContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
