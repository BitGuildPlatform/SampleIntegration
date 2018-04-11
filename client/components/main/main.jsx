import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {messageShow} from "../../actions/message";
import {Button, ButtonToolbar, Form, FormControl} from "react-bootstrap";
import Message from "../common/message";
import MetaMaskPopup from "../common/metamask";
import {TAKE_MY_MONEY} from "../../../shared/constants/actions";


@injectIntl
@connect(
	state => ({
		account: state.account
	}),
	dispatch => bindActionCreators({messageShow, dispatch: data => dispatch => dispatch(data)}, dispatch)
)
export default class Pay extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		account: PropTypes.object,
		intl: intlShape.isRequired
	};

	state = {
		amount: 0.01, // ETH
		wallet: this.props.account.wallet
	};

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
		return (
			<Form onSubmit={::this.onSubmit} inline>
				<ButtonToolbar>
					<Button type="submit">
						<FormattedMessage id="components.buttons.submit"/>
					</Button>
				</ButtonToolbar>
			</Form>
		);
	}

	render() {
		return (
			<div>
				<MetaMaskPopup/>

				{this.renderForm()}

				<br/>

				<Message/>
			</div>
		);
	}
}
