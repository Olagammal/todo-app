import React, { Component } from "react";
import { Container } from "reactstrap";
import InputTodo from "./components/InputTodo";
import TodoContainer from "./components/TodoContainer";
import Alert from "./components/Alert";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Container>
        <h1 className="text-center" data-testid="h1-component">
          To-do list
        </h1>
        <InputTodo />
        <TodoContainer />
        <Alert />
      </Container>
    );
  }
}

export default App;
