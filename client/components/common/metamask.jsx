import {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {CHANGE_ACCOUNT, MESSAGE_ADD} from "../../../shared/constants/actions";


@connect(
  state => ({
    account: state.account
  })
)
export default class MetaMaskPopup extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func
  };

  state = {
    interval: null
  };

  isMetaMaskInstalled() {
    return typeof window !== "undefined" && window.web3;
  }

  componentDidMount() {
    if (this.isMetaMaskInstalled()) {
      this.setState({
        interval: setInterval(() => {
          if (window.web3.eth.accounts[0] !== this.props.account.wallet) {
            this.props.dispatch({
              type: CHANGE_ACCOUNT,
              payload: {
                wallet: window.web3.eth.accounts[0]
              }
            });
          }
        }, 100)
      });
    } else {
      this.props.dispatch({
        type: MESSAGE_ADD,
        payload: {
          status: 418, // I'm a teapot
          message: "metamask-is-not-installed"
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return null;
  }
}
