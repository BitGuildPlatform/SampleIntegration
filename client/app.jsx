import React, {Component} from "react";
import {Route, Switch} from "react-router";

import Main from "./components/main/main";
import NotFound from "./components/common/notfound";


export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Main} exact />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
