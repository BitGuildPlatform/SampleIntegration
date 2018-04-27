import React, {Component} from "react";
import {Glyphicon} from "react-bootstrap";
import {FormattedMessage} from "react-intl";


export default class Loader extends Component {
  render() {
    return (
      <div>
        <Glyphicon glyph="refresh" className="gly-spin" />
        {" "}
        <FormattedMessage id="misc.sending" />
      </div>
    );
  }
}
