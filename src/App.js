import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MainPage from "./Components/backGround/MainPage";
import BadgePage from "./Components/badge/BadgePage";
import PlanetHistoryPage from "./Components/planetHistory/PlanetHistoryPage";
import EPage from "./Components/server/EPage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/badge" exact component={BadgePage} />
          <Route path="/planetHistory" exact component={PlanetHistoryPage} />
          <Route path="/BE_Edit" exact component={EPage} />
          <Route path="/:id" exact component={MainPage} />
        </Switch>
      </Router>
    );
  }
}
