import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import React from "react";
import App from "./App";
import { TodoProvider } from "./context/TodoContext";

describe("App", () => {
  it("renders header text", () => {
    render(
      <MantineProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </MantineProvider>
    );
    expect(screen.getByText("TODO 웹 앱")).toBeInTheDocument();
  });
});

