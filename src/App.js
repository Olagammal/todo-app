import React, { Component } from "react";
import { Container } from "reactstrap";
import InputTodo from "./components/InputTodo";
import TodoContainer from "./components/TodoContainer";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Container>
        <h1 className="text-center">To-do list</h1>
        <InputTodo />
        <TodoContainer />
      </Container>
    );
  }
}

export default App;
