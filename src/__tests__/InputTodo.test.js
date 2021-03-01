import React from "react";
import { shallow } from "enzyme";
import InputTodo from "../components/InputTodo";
import { testStore } from "../utils";

describe("InputTodo Component", () => {
  it("Should render without error", () => {
    const store = testStore({
      InputReducer: { todo: "" },
      TodoReducer: { todos: [{}, {}] },
    });
    const wrapper = shallow(<InputTodo store={store} />)
      .childAt(0)
      .dive();
    const component = wrapper.find(`[data-test="InputTodo"]`);
    expect(component.length).toBe(1);
  });
});
