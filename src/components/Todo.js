import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import { BsFillTrashFill } from "react-icons/bs";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";
import { toggleCompletion, deleteTodo } from "../actions/TodoAction";

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  toggleTodoCompletion = (todoId) => {
    this.props.toggleCompletion(todoId);
  };

  handleDeleteTodo = (todoId) => {
    this.props.deleteTodo(todoId);
  };
  render() {
    return (
      <InputGroup>
        <InputGroupAddon addonType="append">
          <span
            className="input-group-text"
            onClick={(e) => this.toggleTodoCompletion(this.props.singleTodo.id)}
          >
            {this.props.singleTodo.status === "pending" ? (
              <RiCheckboxBlankLine />
            ) : (
              <RiCheckboxFill />
            )}
          </span>
        </InputGroupAddon>
        <Input value={this.props.singleTodo.text} readOnly />
        <InputGroupAddon addonType="append">
          <span
            className="input-group-text"
            onClick={(e) => this.handleDeleteTodo(this.props.singleTodo.id)}
          >
            <BsFillTrashFill />
          </span>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // todo: state.TodoReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleCompletion, deleteTodo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
