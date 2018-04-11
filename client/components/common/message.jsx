import React, {Component} from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {FormattedHTMLMessage} from "react-intl";
import {messageRemove} from "../../actions/message";
import {Alert} from "react-bootstrap";


@connect(
  state => ({
    messages: state.messages
  }),
  dispatch => bindActionCreators({messageRemove}, dispatch)
)
export default class Message extends Component {
  static propTypes = {
    messages: PropTypes.array,
    messageRemove: PropTypes.func
  };

  static defaultProps = {
    messages: []
  };

  componentWillUnmount() {
    this.props.messages.map(message =>
      this.props.messageRemove(message)
    );
  }

  onDismiss(message) {
    return () => {
      this.props.messageRemove(message);
    };
  }

  renderMessage(message, i) {
    console.error(message.status)
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
