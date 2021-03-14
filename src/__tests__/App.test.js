import React from "react";
import { render, screen } from "../utils";
import "@testing-library/jest-dom";
import App from "../App";

describe("App component", () => {
  it("Should render h1 component", () => {
    render(<App />, {
      initialState: {
        alertReducer: { alertText: "", alertType: "" },
        inputReducer: { todo: "" },
        todoReducer: {
          todos: [],
        },
      },
    });
    expect(screen.queryByTestId("h1-component")).toBeInTheDocument();
  });
});
