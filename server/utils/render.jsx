import React from "react";
import {renderToStaticMarkup, renderToString} from "react-dom/server";
import {StaticRouter} from "react-router";
import {Provider} from "react-intl-redux";


export function renderInitialMarkup(url, store, context, App) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
}

export function renderHTML(initialMarkup, store, Wrapper) {
  return `<!doctype html>\n${renderToStaticMarkup(
    <Wrapper initialMarkup={initialMarkup} initialState={store.getState()} />
  )}`;
}
