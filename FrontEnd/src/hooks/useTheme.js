// src/hooks/useTheme.js

import { useContext } from "react";
import ThemeContext from "../context/ThemeContextValue";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}
