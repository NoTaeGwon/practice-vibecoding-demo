import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import App from "./App";
import { TodoProvider } from "./context/TodoContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light">
      <TodoProvider>
        <App />
      </TodoProvider>
    </MantineProvider>
  </React.StrictMode>
);

