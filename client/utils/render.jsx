import React from "react";
import {hydrate, render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-intl-redux";


export default (App, store) => {
  (process.env.RENDERING === "server" ? hydrate : render)(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  );
};
