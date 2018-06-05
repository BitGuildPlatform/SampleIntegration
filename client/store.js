import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import rootReducers from "./reducers";
import rootSaga from "./sagas";
import {defaultLanguage, enabledLanguages} from "../shared/constants/language";
import {localization} from "../shared/intl/setup";


const defaultState = {
  intl: {
    locale: defaultLanguage,
    defaultLocale: defaultLanguage,
    enabledLanguages,
    ...(localization[defaultLanguage] || {})
  }
};

export default function(initialState = defaultState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunkMiddleware, sagaMiddleware];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    middlewares.push(createLogger());
  }

  if (process.env.NODE_ENV === "development") {
    composeEnhancers = composeWithDevTools;
  }

  const store = createStore(rootReducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(require.resolve("./reducers"), () => {
      store.replaceReducer(rootReducers);
    });
  }

  return store;
}
