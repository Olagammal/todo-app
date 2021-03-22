import React from "react";
import { render, fireEvent, screen } from "../utils";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import * as types from "../actionTypes";
import * as inputactions from "../actions/inputAction";
import inputreducer from "../reducer/inputReducer";
import todoreducer from "../reducer/todoReducer";
import InputTodo from "../components/InputTodo";
import App from "../App";

jest.useFakeTimers();

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
      screen.getByPlaceholderText("Enter a new task...")
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
  afterEach(cleanup);
  it("should render an alert", () => {
    fireEvent.click(screen.getByTestId("input-field-button"));
    expect(screen.getByText("Enter a valid to-do")).toBeInTheDocument();
  });

  it("should render alert for enter key", () => {
    fireEvent.keyPress(screen.getByTestId("input-field"), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(screen.getByText("Enter a valid to-do")).toBeNull();
  });
});

// describe("testing for alert on keypress", () => {
//   beforeEach(() => {
//     render(<App />, {
//       initialState: {
//         alertReducer: { alertText: "", alertType: "" },
//         inputReducer: { todo: "" },
//         todoReducer: {
//           todos: [],
//         },
//       },
//     });
//   });

//   it("should render alert for enter key", () => {
//     fireEvent.keyPress(screen.getByTestId("input-field"), {
//       key: "Enter",
//       code: "Enter",
//       charCode: 13,
//     });
//     expect(screen.getByText("Enter a valid to-do")).toBeInTheDocument();
//   });
// });
