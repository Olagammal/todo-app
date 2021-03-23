import React from "react";
import { render, fireEvent, screen } from "../utils";
import userEvent from '@testing-library/user-event'
import * as inputactions from "../actions/inputAction";
import "@testing-library/jest-dom"
import * as types from "../actionTypes";
import inputreducer from "../reducer/inputReducer";
import todoreducer from "../reducer/todoReducer";
import InputTodo from "../components/InputTodo";
import App from "../App";

describe("input todo component", () => {

  beforeEach(() => {
    render(<InputTodo />, {
      initialState: {
        alertReducer: { alertText: "", alertType: "" },
        inputReducer: { todo: "" },
        todoReducer: { todos: [] },
      },
    });
  });

  it("Should render the InputField", () => {
    expect(screen.getByTestId("input-field")).toBeInTheDocument();
  });

  it("Should render the button", () => {
    expect(screen.getByTestId("input-field-button")).toBeInTheDocument();
  });

  it("Should have placeholder text", () => {
    expect(
      screen.getByPlaceholderText("Enter a new task...")
    ).toBeInTheDocument();
  });

  it("should change input field value displayed when an input is entered", () => {
    fireEvent.change(screen.getByTestId("input-field"), {
      target: { value: "A-string" },
    });
    expect(screen.getByTestId("input-field").value).toBe("A-string")
  });

  it("should dispatch correct action when input is entered in input field", () => {
    fireEvent.change(screen.getByTestId("input-field"), {
      target: { value: "A-string" },
    });
    expect(inputactions.inputChange("string-value")).toEqual({
      type: types.INPUTCHANGE,
      payload: "string-value",
    });
  });

  it("should change reducer value when an input is entered", () => {
    expect(
      inputreducer(
        { todo: "" },
        {
          type: types.INPUTCHANGE,
          payload: "A-string",
        }
      )
    ).toEqual({ todo: "A-string" });
  });

  it("should add todo to store when button is clicked", () => {
    expect(
      todoreducer(
        { todos: ["ppp"] },
        {
          type: types.ADDTODO,
          payload: "aaa",
        }
      )
    ).toEqual({ todos: ["ppp", "aaa"] });
  });

});

describe("testing for alert on click", () => {
  beforeEach(() => {
    render(<App />, {
      initialState: {
        alertReducer: { alertText: "", alertType: "" },
        inputReducer: { todo: "" },
        todoReducer: {
          todos: [],
        },
      },
    });
  });
  it("should render an alert", () => {
    userEvent.click(screen.getByTestId("input-field-button"));
    expect(screen.getByText("Enter a valid to-do")).toBeInTheDocument();
  });
});

