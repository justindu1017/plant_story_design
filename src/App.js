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
          {/* <Route path="/" exact component={MainPage} /> */}
          <Route path="/" exact render={(props) => <MainPage {...props} />} />

          {/* <Route path="/badge" exact component={BadgePage} /> */}
          <Route
            exact
            path="/badge"
            render={(props) => <MainPage {...props} com={BadgePage} />}
          />
          {/* <Route path="/planetHistory" exact component={PlanetHistoryPage} /> */}
          <Route
            exact
            path="/planetHistory"
            render={(props) => <MainPage {...props} com={PlanetHistoryPage} />}
          />
          {/* <Route path="/BE_Edit" exact component={EPage} /> */}
          <Route
            exact
            path="/BE_Edit"
            render={(props) => <EPage {...props} />}
          />
          {/* <Route path="/:id" component={MainPage} /> */}
          <Route
            path="/:id"
            render={(props) => <MainPage {...props} from={"/planetHistory"} />}
          />
        </Switch>
      </Router>
    );
  }
}
