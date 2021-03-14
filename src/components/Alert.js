import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { handleAlert } from "../actions/alert";
import "react-notifications/lib/notifications.css";

class Alert extends Component {
  constructor(props) {
    super(props);
  }

  changeAlertState = () => {
    const { alert } = this.props;
    switch (alert.alertType) {
      case "error":
        if (document.getElementsByClassName("notification-error").length < 1) {
          NotificationManager.error(alert.alertText, null, 3000);
        }
        break;
      default:
        break;
    }
  };
  componentDidUpdate() {
    this.changeAlertState();
  }
  render() {
    return <NotificationContainer data-testid="alert" />;
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.alertReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleAlert }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
