import React, { Component } from "react";
import Background from "./Background";
import toFetch from "../../func/fetchC.js";
import BGStory from "./BGStory";
import { useLocation } from "react-router-dom";
export default class MainPage extends Component {
  state = {
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
  };

  getInfo = async (MemberID, StoryId = null) => {
    const memberID = MemberID;
    const FetchgetActiveStory = new toFetch(
      "/api/storyProgress/getActiveStory",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ member: memberID })
    );

    const FetchgetStoryByID = new toFetch("/api/storyProgress/" + StoryId, {
      "Content-Type": "application/json",
    });

    const fetchRes = StoryId
      ? FetchgetStoryByID.get()
      : FetchgetActiveStory.post();

    await fetchRes
      .then((res) => res.json())
      .then((res) => {
        res[0].prelude === "false" || res.prelude === "false"
          ? this.setState({ com: BGStory })
          : void 0;
        this.setState({ storyInfo: res.length ? res[0] : res });
      });
  };

  // TODO
  resetState = () => {
    this.setState({ counter: -1 });
    this.setState({ com: Background });
  };

  // for newly created user
  createNewMember = async (LineID, LineName) => {
    console.log("LN", LineName);
    let ret;
    let obj = {
      name: LineName,
      lineID: LineID,
    };

    console.log("ID ", obj);
    const FetchlineID = new toFetch(
      "/api/member",
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
      "/api/storyTemplate/getByStoryID",
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
      "/api/storyProgress/",
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
      "/api/member/getByLineID/",
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
      console.log("MID", memberID);
      await this.linkStory001(memberID);
      await this.getInfo(memberID, StoryId);
      // this.setState({ com: BGStory });
    } else {
      await this.getInfo(ret[0]._id, StoryId);
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
    console.log(this.state.storyInfo._id);
    const updatePrelude = new toFetch(
      "/api/storyProgress/" + this.state.storyInfo._id,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ prelude: "true" })
    );
    updatePrelude.put();

    this.setState({ com: this.state.origin });
  };

  async componentDidMount() {
    require("dotenv").config();
    // console.log();
    const { pathname } = this.props.location;
    console.log("inside mp ", process.env["REACT_APP_LiffID"]);
    this.props.com
      ? this.setState({ com: this.props.com, origin: this.props.com })
      : void 0;

    let Envir = await process.env["REACT_APP_Envir"];
    let getID =
      Envir === "Production" ? await process.env["REACT_APP_LineID"] : "";
    // let getID;
    let getName =
      Envir === "Production" ? await process.env["REACT_APP_LineName"] : "";
    // let getName;
    const { id } = this.props.match.params;
    const liff = window.liff;
    console.log(!(Envir === "Production"));
    if (!(Envir === "Production")) {
      console.log("here");
      if (!liff.isLoggedIn()) {
        console.log("已登入");
        const uri = window.location.href;
        sessionStorage.setItem("liffLoginRedirect", uri);
        liff.login();
      } else {
        console.log("here2");

        liff.getProfile().then((res) => {
          getID = res.userId;
          getName = res.displayName;
        });
      }
    }

    await this.getMemberID(getID, getName, id);
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
      />
    );
  }
}
