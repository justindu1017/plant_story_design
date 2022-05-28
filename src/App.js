import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MainPage from "./Components/backGround/MainPage";
import BadgePage from "./Components/badge/BadgePage";
import BadgeShow from "./Components/badge/BadgeShow";

import MsgListPage from "./Components/msgList/MsgListPage";
import PlanetHistoryPage from "./Components/planetHistory/PlanetHistoryPage";
import EPage from "./Components/server/EPage";
import Tester from "./Components/test/Tester";

export default class App extends Component {
  // async wait(liff) {
  //   if (!liff.isLoggedIn()) {
  //     const uri = window.location.href;
  //     console.log(uri);
  //     sessionStorage.setItem("liffLoginRedirect", uri);
  //     liff.login();
  //   } else {
  //     console.log("😊😊😊😊已登入");
  //     liff.getProfile().then((res) => {
  //       console.log(res);
  //     });
  //   }
  // }

  async componentDidMount() {
    // const liff = window.liff;
    // await (async () => {
    //   console.log("1656053787-0z4ZO5z3"); // OK
    //   // console.log("%NODE_ENV%"); // development
    //   await liff.init({ liffId: "1656053787-0z4ZO5z3" });
    //   if (new URL(window.location).searchParams.get("liff.state")) return;
    //   const liffLoginRedirect = sessionStorage.getItem("liffLoginRedirect");
    //   if (liffLoginRedirect) {
    //     console.log("❤️❤️❤️❤️Routing");
    //     sessionStorage.removeItem("liffLoginRedirect");
    //     window.location.href = liffLoginRedirect;
    //   }
    // })();
    // await this.wait(liff);
  }

  render() {
    return (
      // <Tester />
      <Router>
        <Switch>
          {/* <Route path="/" exact component={MainPage} /> */}
          <Route path="/" exact render={(props) => <MainPage {...props} />} />
          {/* <Route path="/" exact component={Tester} /> */}

          {/* <Route path="/badge" exact component={BadgePage} /> */}
          <Route
            exact
            path="/badge"
            render={(props) => <MainPage {...props} com={BadgePage} />}
          />
          <Route
            exact
            path="/badge/:id"
            render={(props) => <MainPage {...props} com={BadgeShow} />}
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

          {/* <Route path="/msgList/:id" component={msgList} /> */}
          <Route
            path="/msg/:id"
            render={(props) => (
              <MainPage {...props} com={MsgListPage} from={"/planetHistory"} />
            )}
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
