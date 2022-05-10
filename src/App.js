import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MainPage from "./Components/backGround/MainPage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
        </Switch>
      </Router>
    );
  }
}
