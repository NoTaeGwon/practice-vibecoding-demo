import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import React from "react";
import App from "./App";

describe("App", () => {
  it("renders header text", () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    expect(screen.getByText("TODO 웹 앱")).toBeInTheDocument();
  });
});


