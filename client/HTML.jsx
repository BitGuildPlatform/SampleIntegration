import React from "react";
import PropTypes from "prop-types";


export default class HTML extends React.Component {
  static propTypes = {
    initialMarkup: PropTypes.string,
    initialState: PropTypes.object
  };

  renderScripts() {
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
      return (
        <div>
          <script src="https://unpkg.com/react@16.3.1/umd/react.production.min.js" type="text/javascript" crossOrigin="anonymous" />
          <script src="https://unpkg.com/react-dom@16.3.1/umd/react-dom.production.min.js" type="text/javascript" crossOrigin="anonymous" />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="BitGuild is a decentralized gaming platform designed to eliminate burdensome fees, fraud, and regulations while creating a tokenized gaming marketplace." />
          <meta name="keywords" content="keywords" />
          <meta name="robots" content="all" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="shortcut icon" href={"/favicon.ico"} />
          <link href={"/bundle/client.css"} rel="stylesheet" />
          <title>BitGuild Crowdsale Whitelisting</title>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.initialMarkup}} />
          <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`}} />
          {this.renderScripts()}
          <script src={"/bundle/client.js"} type="text/javascript" crossOrigin="anonymous" />
        </body>
      </html>
    );
  }
}
