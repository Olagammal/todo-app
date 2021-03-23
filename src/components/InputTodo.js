import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { inputChange } from "../actions/inputAction";
import { handleAlert } from "../actions/alert";
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

class InputTodo extends Component {
  constructor(props) {
    super(props);
  }
  handleInputChange = (e) => {
    this.props.inputChange(e.target.value);
  };
  handleAddTodo = (e) => {
    const { inputTodo } = this.props;
    e.preventDefault();
    if (inputTodo.todo) {
      this.props.addTodo({
        id: uuidv4(),
        text: inputTodo.todo,
        status: "pending",
      });
      this.props.inputChange("");
    } else {
      this.props.handleAlert("error", "Enter a valid to-do");
      setTimeout(() => {
        this.props.handleAlert("", "");
      }, 3400);
    }
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <InputGroup>
            <Input
              value={this.props.inputTodo.todo}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
              placeholder="Enter a new task..."
              data-testid="input-field"
            />
            <InputGroupAddon addonType="append">
              <Button
                type="submit"
                className="addTodobtn"
                data-testid="input-field-button"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleAddTodo(e);
                }}
              >
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
    alert: state.alertReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTodo, inputChange, handleAlert }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
