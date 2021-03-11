import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { inputChange } from "../actions/inputAction";
import { handleAlert } from "../actions/alert"
import { addTodo } from "../actions/todoAction";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import Alert from "./Alert"

class InputTodo extends Component {
  constructor(props) {
    super(props);
  }
  handleInputChange = (e) => {
    this.props.inputChange(e.target.value);
  };
  handleAddTodo = (e) => {
    const { inputTodo } = this.props
    e.preventDefault();
    if (inputTodo.todo) {
      this.props.addTodo({
        id: uuidv4(),
        text: inputTodo.todo,
        status: "pending",
      });
      this.props.inputChange("");
    }
    else {
      this.props.handleAlert('error', 'Enter a valid to-do')
    }
  };

  render() {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleAddTodo(e);
        }}
        data-test="InputTodo"
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
    todo: state.todoReducer,
    inputTodo: state.inputReducer,
    alert: state.alertReducer
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTodo, inputChange, handleAlert }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
