import React from "react";
import { render, fireEvent, screen } from "../utils";
import "@testing-library/jest-dom";
import * as inputactions from "../actions/inputAction";
import * as todoactions from "../actions/todoAction";
import * as types from "../actionTypes";
import inputreducer from "../reducer/inputReducer";
import todoreducer from "../reducer/todoReducer";
import InputTodo from "../components/InputTodo";
import Alert from "../components/Alert";

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
    expect(screen.queryByTestId("input-field")).toBeInTheDocument();
  });

  it("Should render the button", () => {
    expect(screen.queryByTestId("input-field-button")).toBeInTheDocument();
  });

  it("Should have placeholder text", () => {
    expect(
      screen.getAllByPlaceholderText("Enter a new task...")[0]
    ).toBeInTheDocument();
  });

  it("should dispatch correct action when input is entered in input field", () => {
    fireEvent.change(screen.queryByTestId("input-field"), {
      target: { value: "A-string" },
    });
    expect(inputactions.inputChange("string-value")).toEqual({
      type: types.INPUTCHANGE,
      payload: "string-value",
    });
  });

  it("should change store value when an input is entered", () => {
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

  it("should dispatch correct action when button is clicked", () => {
    fireEvent.click(screen.queryByTestId("input-field-button"));
    expect(todoactions.addTodo("aaa")).toEqual({
      type: types.ADDTODO,
      payload: "aaa",
    });
  });

  it("should dispatch correct action when enter button is pressed", () => {
    fireEvent.keyPress(screen.queryByTestId("input-field-button"), {
      key: "Enter",
      code: "Enter",
    });
    expect(todoactions.addTodo("aaa")).toEqual({
      type: types.ADDTODO,
      payload: "aaa",
    });
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
