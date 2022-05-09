import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Background from "./Components/backGround/Background";
import MainPage from "./Components/backGround/MainPage";
import Msg from "./Components/task/Msg";
import TaskPage from "./Components/task/TaskPage";

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
