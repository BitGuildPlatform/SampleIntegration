export default new class BitGuildSDK {

	isBitGuildPortal = false;
	isInitialized = false;

	// domain = "https://bitguild.info/";

	init() {
		// todo cache promise
		return new Promise((resolve, reject) => {
			if (this.isInitialized) {
				resolve();
			} else {
				setTimeout(() => { reject(/* new Error("timeout!") */); }, 200);
				window.addEventListener("message", ::this.receiveMessage(resolve, reject), false);
				window.top.postMessage({type: "ping"}, "*" /* this.domain */);
			}
		})
			.then(() => {
				this.isInitialized = true;
			});
	}

	receiveMessage(resolve, reject) {
		return ({data/* , origin, source */}) => {
			if (data.type === "pong") {
				/*
				if (origin !== this.domain) {
					reject();
				}
				*/
				this.isBitGuildPortal = true;
				resolve();
			}
		}
	}

	isOnPortal() {
		return this.init()
			.then(() => this.isBitGuildPortal);
	}

	/*
	static isOnPortal(){
		return window.top.location.href.startsWith(this.domain);
	}
	*/
}();
