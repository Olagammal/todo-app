import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { inputChange } from "../actions/InputAction";
import { addTodo } from "../actions/TodoAction";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";

class InputTodo extends Component {
  constructor(props) {
    super(props);
  }
  handleInputChange = (e) => {
    console.log(e.key);
    this.props.inputChange(e.target.value);
  };
  handleAddTodo = (e) => {
    e.preventDefault();
    this.props.addTodo({
      id: uuidv4(),
      text: this.props.inputTodo.todo,
      status: "pending",
    });
    this.props.inputChange("");
  };

  render() {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleAddTodo(e);
        }}
      >
        <FormGroup>
          <InputGroup>
            <Input
              value={this.props.inputTodo.todo}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
              onKeyPress={(e) =>
                e.key === "Enter" ? this.handleAddTodo(e) : ""
              }
              placeholder="Enter a new task..."
            />
            <InputGroupAddon addonType="append">
              <Button type="submit" className="addTodobtn">
                Add Todo
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.TodoReducer,
    inputTodo: state.InputReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTodo, inputChange }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
