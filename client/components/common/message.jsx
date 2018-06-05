import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedHTMLMessage} from "react-intl";
import {Alert} from "react-bootstrap";
import {MESSAGE_REMOVE, MESSAGE_REMOVE_ALL} from "../../../shared/constants/actions";


@connect(
  state => ({
    messages: state.messages
  })
)
export default class Message extends Component {
  static propTypes = {
    messages: PropTypes.array,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    messages: []
  };

  componentWillUnmount() {
    const {dispatch} = this.props;

    dispatch({
      type: MESSAGE_REMOVE_ALL
    });
  }

  onDismiss(message) {
    const {dispatch} = this.props;

    return () => {
      dispatch({
        payload: message,
        type: MESSAGE_REMOVE
      });
    };
  }

  renderMessage(message, i) {
    return (
      <Alert key={i} bsStyle={message.type || "danger"} onDismiss={::this.onDismiss(message)}>
        {message.status ? <FormattedHTMLMessage id={`errors.${message.message}`} values={message} /> : message.message}
      </Alert>
    );
  }

  render() {
    return (
      <div>
        {this.props.messages.map(::this.renderMessage)}
      </div>
    );
  }
}
