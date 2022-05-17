/* eslint-disable no-undef */
import React, { Component } from "react";
import Background from "./Background";
import toFetch from "../../func/fetchC.js";
import BGStory from "./BGStory";

export default class MainPage extends Component {
  state = {
    com: Background,
    counter: -1,
    storyInfo: {
      _id: "",
      storyTemplate: {
        _id: "",
        storyID: "",
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
      subProgress: "",
      badge: "",
      taskMessages: [],
      taskPhoto: "",
      completion: "",
      create_date: "",
      __v: "",
    },
  };

  getInfo = async (MemberID) => {
    const memberID = MemberID;
    const FetchgetActiveStory = new toFetch(
      "http://localhost:5000/api/storyProgress/getActiveStory",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ member: memberID })
    );
    FetchgetActiveStory.post()
      .then((res) => res.json())
      .then((res) => {
        this.setState({ storyInfo: res[0] });
      });
  };

  resetState = () => {
    this.setState({ counter: -1 });
    this.setState({ com: Background });
  };

  createNewMember = async (LineID, LineName) => {
    let ret;
    let obj = {
      name: LineName,
      lineID: LineID,
    };
    const FetchlineID = new toFetch(
      "http://localhost:5000/api/member",
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

  getTMPByStoryID = async () => {
    // !!! conbine with TheEndBTN???

    const getByStoryID = new toFetch(
      "http://localhost:5000/api/storyTemplate/getByStoryID",
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
    console.log("get SId = ", _id);
    return _id;
  };

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
      "http://localhost:5000/api/storyProgress/",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(obj)
    );

    await combineMemberTmp.post();
  };

  getMemberID = async (LineID, LineName) => {
    let ret;
    const FetchlineID = new toFetch(
      "http://localhost:5000/api/member/getByLineID/",
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
      await this.getInfo(memberID);

      this.setState({ com: BGStory });
    } else {
      await this.getInfo(ret[0]._id);
    }
  };

  async componentDidMount() {
    let getID = await process.env.REACT_APP_LineID;
    let getName = await process.env.REACT_APP_LineName;

    // await liff
    //   .init({
    //     liffId: "1656053787-a6qvwxW7",
    //   })
    //   .then(() => {
    //     if (!liff.isLoggedIn()) {
    //       console.log("你還沒登入Line哦！");
    //       sessionStorage.setItem("liffLoginRedirect", window.location.href);
    //       const uri = window.location.href;
    //       liff.login({ redirectUri: uri });
    //       // window.location.href = uri;
    //     } else {
    //       liff.getProfile().then((res) => {
    //         getID = res.userId;
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("初始化失敗");
    //   });

    await this.getMemberID(getID, getName);
  }

  changeActivity = (com) => {
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ com: com });
  };
  rollBack = (com) => {
    this.setState({ counter: this.state.counter - 1 });
    this.setState({ com: com });
  };

  gotoMain = () => {
    this.setState({ com: Background });
  };

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
      />
      // <BGStory counter={this.state.counter} />
    );
  }
}
