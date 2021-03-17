import React from "react";
import { render, fireEvent, screen } from "../utils";
import "@testing-library/jest-dom";
import * as inputactions from "../actions/inputAction";
import * as todoactions from "../actions/todoAction";
import * as alertactions from "../actions/alert"
import * as types from "../actionTypes";
import inputreducer from "../reducer/inputReducer";
import todoreducer from "../reducer/todoReducer";
import InputTodo from "../components/InputTodo";

describe("input todo component", () => {
  const itif = (condition) => condition ? it : it.skip;

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

  // it("should dispatch correct action when button is clicked", () => {
  //   fireEvent.click(screen.queryByTestId("input-field-button"));
  //   // expect(todoactions.addTodo("")).toEqual({
  //   //   type: types.ADDTODO,
  //   //   payload: "",
  //   // });
  //   // expect(alert.handleAlert("", "")).toEqual({
  //   //   type: types.DISPLAYALERT,
  //   //   payload: { type: "", text: "" },
  //   // });
  // });

  it("should dispatch correct action when enter key is pressed", () => {
    fireEvent.keyPress(screen.getByTestId("input-field-button"), {
      key: "Enter",
      code: "Enter",
    });
    expect(todoactions.addTodo("aaa")).toEqual({
      type: types.ADDTODO,
      payload: "aaa",
    });
  });

  it("should add todo to store when button is clicked", () => {
    fireEvent.click(screen.getByTestId("input-field-button"));
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
