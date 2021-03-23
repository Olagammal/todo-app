import React from "react";
import { render, fireEvent, screen } from "../utils";
import "@testing-library/jest-dom";
import * as todoactions from "../actions/todoAction";
import * as types from "../actionTypes";
import todoreducer from "../reducer/todoReducer";
import Todo from "../components/Todo";

describe("todo component", () => {
  beforeEach(() => {
    render(
      <Todo key={1} singleTodo={{ id: 1, status: "pending", text: "aaa" }} />,
      {
        initialState: {
          alertReducer: { alertText: "", alertType: "" },
          inputReducer: { todo: "" },
          todoReducer: {
            todos: [
              {
                id: 1,
                status: "pending",
                text: "aaa",
              },
            ],
          },
        },
      }
    );
  });

  it("should dispatch correct action on clicking checkbox", () => {
    expect(todoactions.toggleCompletion(1)).toEqual({
      type: types.TOGGLECOMPLETION,
      payload: 1,
    });
  });

  it("Should change sstatus of todo on clicking checkbox", () => {
    expect(
      todoreducer(
        {
          todos: [
            {
              id: 1,
              status: "pending",
              text: "aaa",
            },
          ],
        },
        {
          type: types.TOGGLECOMPLETION,
          payload: 1,
        }
      )
    ).toEqual({
      todos: [
        {
          id: 1,
          status: "completed",
          text: "aaa",
        },
      ],
    });
  });

  it("should dispatch correct action on clicking trash-icon", () => {
    expect(todoactions.deleteTodo(1)).toEqual({
      type: types.DELETETODO,
      payload: 1,
    });
  });

  it("should delete todo when trash-icon is clicked", () => {
    expect(
      todoreducer(
        {
          todos: [
            {
              id: 1,
              status: "pending",
              text: "aaa",
            },
            {
              id: 2,
              status: "pending",
              text: "oaa",
            },
          ],
        },
        {
          type: types.DELETETODO,
          payload: 1,
        }
      )
    ).toEqual({
      todos: [
        {
          id: 2,
          status: "pending",
          text: "oaa",
        },
      ],
    });
  });
});
