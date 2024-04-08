import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

import "./css/tailwind.css";
import { GlobalProvider } from "./context/globalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
      <Toaster visibleToasts={3} />
    </NextUIProvider>
  </React.StrictMode>
);
