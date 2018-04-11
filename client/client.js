import "./styles.less";
import "../static/favicon.ico";
import App from "./app";
import hydrate from "./utils/hydrate";
import configureStore from "./store";


const store = configureStore(window.__INITIAL_STATE__);

hydrate(App, store);

if (module.hot) {
	module.hot.accept("./app", () => {
		hydrate(App, store);
	});
}
