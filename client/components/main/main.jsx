import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import {connect} from "react-redux";
import {Button, ButtonToolbar, Form} from "react-bootstrap";
import Message from "../common/message";
import MetaMaskPopup from "../common/metamask";
import {TAKE_MY_MONEY} from "../../../shared/constants/actions";


@injectIntl
@connect(
  state => ({
    account: state.account
  })
)
export default class Pay extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    account: PropTypes.object,
    intl: intlShape.isRequired
  };

  state = {
    amount: 0.01,
    name: "ETH",
    wallet: this.props.account.wallet
  };

  componentDidMount() {
    window.sdk.default.isOnPortal()
      .then(isOnPortal => {
        console.log("componentDidMount:isOnPortal", isOnPortal);
        return window.sdk.default.getUser()
          .then(user => {
            console.log("componentDidMount:user", user);
            this.setState({
              amount: isOnPortal ? 42 : this.state.amount,
              name: isOnPortal ? "PLAT" : this.state.name,
              user: user
            });
          });
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wallet: nextProps.account.wallet
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.dispatch({
      type: TAKE_MY_MONEY,
      payload: this.state
    });
  }

  renderForm() {
    // initial render
    if (!this.state.amount) {
      return null;
    }

    // metamask is not logged in
    if (!this.state.wallet) {
      return null;
    }

    return (
      <Form onSubmit={::this.onSubmit} inline>
        <ButtonToolbar>
          <Button type="submit">
            <FormattedMessage id="components.buttons.submit" values={this.state} />
          </Button>
        </ButtonToolbar>
      </Form>
    );
  }

  render() {
    console.log("this.state", this.state);

    return (
      <div>
        <MetaMaskPopup />

        {this.renderForm()}

        <br />

        <Message />
      </div>
    );
  }
}
