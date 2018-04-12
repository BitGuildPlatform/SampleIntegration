import React, {Component} from "react";


export default class Init extends Component {

	state = {
		isInitialized: false
	};

	componentDidMount() {
		window.addEventListener("message", ::this.receiveMessage, false);
	}

	componentWillUnmount() {
		window.removeEventListener("message", ::this.receiveMessage)
	}

	receiveMessage({data, origin, source}) {
		if (data.type === "ping") {
			if (!this.state.isInitialized)
				this.setState({
					isInitialized: true
				}, () => {
					source.postMessage({type: "pong"}, origin);
				});
		}
	}

	render() {
		return null;
	}
}
