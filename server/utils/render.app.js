import HTML from "../../client/HTML";
import {renderInitialMarkup, renderHTML} from "./render";
import {defaultLanguage, enabledLanguages} from "../../shared/constants/language";
import {localization} from "../../shared/intl/setup";
import App from "../../client/app";
import configureStore from "../../client/store";


export function renderAppToString(request, response) {
  const initLocale = defaultLanguage;
  const preloadedState = {
    intl: {
      locale: initLocale,
      enabledLanguages,
      ...(localization[initLocale] || {})
    }
  };

  const store = configureStore(preloadedState);

  const context = {};

  const initialMarkup = renderInitialMarkup(request.url, store, context, App);

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    response.redirect(302, context.url);
  } else {
    response.status(200).send(renderHTML(initialMarkup, store, HTML));
  }
}

