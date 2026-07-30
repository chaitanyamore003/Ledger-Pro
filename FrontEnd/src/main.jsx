import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

import "./index.css";

import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SideBarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <SidebarProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SidebarProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
