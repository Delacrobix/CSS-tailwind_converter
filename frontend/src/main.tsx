import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

import "./css/tailwind.css";
import { GlobalProvider } from "./context/globalContext.tsx";
import { ThemeProvider } from "./context/themeState.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <GlobalProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </GlobalProvider>
      <Toaster visibleToasts={3} />
    </NextUIProvider>
  </React.StrictMode>
);
