import React, { Component } from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, FormGroup } from "reactstrap";
import 'react-notifications/lib/notifications.css';

class TodoContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <FormGroup>
          {this.props.todo &&
            this.props.todo.todos.map((singleTodo) => (
              <Todo key={singleTodo.id} singleTodo={singleTodo} />
            ))}
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.todoReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
