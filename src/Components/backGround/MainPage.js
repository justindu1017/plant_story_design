import React, { Component } from "react";
import Background from "./Background";
import toFetch from "../../func/fetchC.js";
import BGStory from "./BGStory";
import { useLocation } from "react-router-dom";
import ErrHandel from "../resources/ErrHandel";
import EndStory from "./EndStory";
require("dotenv").config();

export default class MainPage extends Component {
  state = {
    id: null,
    LineID: "",
    LineName: "",
    imgPath: "",
    origin: Background,
    com: Background,
    counter: -1,
    storyInfo: {
      _id: "",
      storyTemplate: {
        _id: "",
        storyID: "003",
        name: "",
        background: "",
        storyMain: "",
        storySub: [],
        task: "",
        taskStory: "",
        badge: "",
        taskMessages: [],
      },
      member: {
        _id: "",
        name: "",
      },
      prelude: "false",
      subProgress: "",
      badge: "",
      taskMessages: [],
      taskPhoto: "",
      completion: "",
      create_date: "",
      __v: "",
    },

    storyTemplate: {
      _id: "",
      storyID: "",
      name: "",
      background: "",
      storyRole: "",
      storyMain: "",
      storyMainPicPath: "",
      storySub: ["", "", ""],
      storySubPicPath: ["", "", ""],
      task: "",
      taskName: "",
      taskType: "",
      taskStory: "",
      taskStoryPicPath: "",
      badge: "",
      badgePicPath: "",
      badgeDescription: "",
      taskMessages: [],
      __v: "",
    },
  };

  getInfo = async (MemberID, StoryId = null) => {
    const memberID = MemberID;
    const FetchgetActiveStory = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/getActiveStory",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ member: memberID })
    );

    const FetchgetStoryByID = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/" + StoryId,
      {
        "Content-Type": "application/json",
      }
    );
    const fetchRes = StoryId
      ? FetchgetStoryByID.get()
      : FetchgetActiveStory.post();

    await fetchRes
      .then((res) => res.json())
      .then((res) => {
        let condition;

        // testing for prelude
        // condition = res[0]
        //   ? res[0].prelude === "false"
        //   : res.prelude === "false";
        condition = Array.isArray(res)
          ? res[0].prelude === "false"
          : res.prelude === "false";

        // res[0].prelude === "false" || res.prelude === "false"
        condition ? this.setState({ com: BGStory }) : void 0;
        this.setState({ storyInfo: res.length ? res[0] : res });
      });
  };

  // TODO
  resetState = () => {
    this.setState({ counter: -1 });
    this.setState({ com: Background });
  };

  theEnd = () => {
    this.setState({ counter: -1 });
    this.setState({ com: EndStory });
  };

  // for newly created user
  createNewMember = async (LineID, LineName) => {
    let ret;
    let obj = {
      name: LineName,
      lineID: LineID,
    };

    const FetchlineID = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/member",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(obj)
    );

    await FetchlineID.post()
      .then((res) => res.json())
      .then((res) => {
        ret = res;
      });

    return ret._id;
  };

  // for newly created user
  getTMPByStoryID = async () => {
    // !!! conbine with TheEndBTN???

    const getByStoryID = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyTemplate/getByStoryID",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ storyID: String("001") })
    );

    const _id = await getByStoryID
      .post()
      .then((res) => res.json())
      .then((res) => {
        return res[0]._id;
      });
    return _id;
  };

  // for newly created user
  linkStory001 = async (memberID) => {
    const obj = {
      storyTemplate: await this.getTMPByStoryID(),
      member: memberID,
      prelude: "false",
      subProgress: "1",
      badge: "",
      taskMessages: [],
      taskPhoto: "",
      taskComplete: "",
      completion: "false",
    };

    const combineMemberTmp = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(obj)
    );

    await combineMemberTmp.post();
  };

  getMemberID = async (LineID, LineName, StoryId = null, pathname) => {
    let ret;
    const FetchlineID = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/member/getByLineID/",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ lineID: LineID })
    );

    await FetchlineID.post()
      .then((res) => res.json())
      .then((res) => {
        ret = res;
      });

    let memberID;

    if (ret.length === 0) {
      // no member, need to create
      memberID = await this.createNewMember(LineID, LineName);
      await this.linkStory001(memberID);
      await this.getInfo(memberID, StoryId);
      // this.setState({ com: BGStory });
    } else {
      await this.preCheck(ret[0]._id);
      await this.getInfo(ret[0]._id, StoryId);
    }
  };

  preCheck = async (MamberID) => {
    const FetchgetActiveStory = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/getActiveStory",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ member: MamberID })
    );
    const activeResult = await FetchgetActiveStory.post()
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    if (!activeResult.length) {
      // no active Story
      await this.linkStory001(MamberID);
    }
  };

  changeActivity = (com) => {
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ com: com });
  };
  rollBack = (com) => {
    this.setState({ counter: this.state.counter - 1 });
    this.setState({ com: com });
  };

  gotoMain = () => {
    // this.setState({ com: Background });
    const updatePrelude = new toFetch(
      process.env["REACT_APP_BackendUri"] +
        "/api/storyProgress/" +
        this.state.storyInfo._id,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ prelude: "true" })
    );
    updatePrelude.put();

    this.setState({ com: this.state.origin });
  };

  reroute(liffLoginRedirect) {
    if (liffLoginRedirect) {
      sessionStorage.removeItem("liffLoginRedirect");
      window.location.href = liffLoginRedirect;
    }
  }

  async wait(liff) {
    if (!liff.isLoggedIn()) {
      const uri = window.location.href;
      sessionStorage.setItem("liffLoginRedirect", uri);
      liff.login();
    } else {
      liff.getProfile().then((res) => {});
    }
  }

  liffLogin = async () => {
    const liff = window.liff;

    let getID;
    let getName;
    await (async () => {
      // await liff.init({ liffId: "1656053787-0z4ZO5z3" });
      await liff.init({ liffId: process.env["REACT_APP_LiffID"] });

      if (new URL(window.location).searchParams.get("liff.state")) return;
      const liffLoginRedirect = sessionStorage.getItem("liffLoginRedirect");
      if (liffLoginRedirect) {
        sessionStorage.removeItem("liffLoginRedirect");
        window.location.href = liffLoginRedirect;
      }
    })();

    await this.wait(liff);
    await liff.getProfile().then((res) => {
      getID = res.userId;
      getName = res.displayName;
    });

    return [getID, getName];
  };

  getTmp = async (_id) => {
    console.log(_id);
    const getter = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyTemplate/" + _id,
      {
        "Content-Type": "application/json",
      }
    );

    await getter
      .get()
      .then((res) => res.json())
      .then((res) => this.setState({ storyTemplate: res }));
  };

  async componentDidMount() {
    const { pathname } = this.props.location;
    this.props.com
      ? this.setState({ com: this.props.com, origin: this.props.com })
      : void 0;

    let Envir = await process.env["REACT_APP_Envir"];
    // let getID =
    //   Envir === "development" ? await process.env["REACT_APP_LineID"] : "";
    // // let getID;
    // let getName =
    //   Envir === "development" ? await process.env["REACT_APP_LineName"] : "";
    // let getName;
    const { id } = this.props.match.params;
    this.setState({ id: id });
    const infoArr = !(Envir == "development")
      ? await this.liffLogin()
      : [
          await process.env["REACT_APP_LineID"],
          await process.env["REACT_APP_LineName"],
        ];
    // const infoArr = !(Envir == "development")? ["ee","tt"]:  [await process.env["REACT_APP_LineID"] , await process.env["REACT_APP_LineName"]]

    // if (!Envir === "development") {
    //   await (async () => {
    //     await liff.init({ liffId: "1656053787-0z4ZO5z3" });
    //     if (new URL(window.location).searchParams.get("liff.state")) return;
    //     const liffLoginRedirect = sessionStorage.getItem("liffLoginRedirect");
    //     if (liffLoginRedirect) {
    //       sessionStorage.removeItem("liffLoginRedirect");
    //       window.location.href = liffLoginRedirect;
    //     }
    //   })();

    //   await this.wait(liff);

    //   await liff.getProfile().then(res =>{
    //     getID = res.userId
    //     getName = res.displayName
    //   })
    // }
    // await this.getMemberID(getID, getName, id);

    this.setState({ LineID: infoArr[0], LineName: infoArr[1] });

    !(pathname === "/" || id)
      ? void 0
      : await this.getMemberID(infoArr[0], infoArr[1], id);
    await this.getTmp(this.state.storyInfo.storyTemplate._id);
  }

  render() {
    return (
      <this.state.com
        counter={this.state.counter}
        storyInfo={this.state.storyInfo}
        changeActivity={this.changeActivity}
        rollBack={this.rollBack}
        getInfo={this.getInfo}
        resetState={this.resetState}
        gotoMain={this.gotoMain}
        origin={this.state.origin}
        from={this.props.from}
        liffLogin={this.liffLogin}
        theEnd={this.theEnd}
        id={this.state.id}
        storyTemplate={this.state.storyTemplate}
      />
    );
  }
}
