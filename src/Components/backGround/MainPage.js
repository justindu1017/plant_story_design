import React, { Component } from "react";
import Background from "./Background";
import toFetch from "../../func/fetchC.js";
import BGStory from "./BGStory";

export default class MainPage extends Component {
  state = {
    origin: Background,
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

  getInfo = async (MemberID, StoryId = null) => {
    const memberID = MemberID;
    const FetchgetActiveStory = new toFetch(
      "http://localhost:5000/api/storyProgress/getActiveStory",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ member: memberID })
    );

    const FetchgetStoryByID = new toFetch(
      "http://localhost:5000/api/storyProgress/" + StoryId,
      {
        "Content-Type": "application/json",
      }
    );

    const fetchRes = StoryId
      ? FetchgetStoryByID.get()
      : FetchgetActiveStory.post();

    fetchRes
      .then((res) => res.json())
      .then((res) => {
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

  // for newly created user
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
      "http://localhost:5000/api/storyProgress/",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(obj)
    );

    await combineMemberTmp.post();
  };

  getMemberID = async (LineID, LineName, StoryId) => {
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
      await this.getInfo(memberID, StoryId);
      this.setState({ com: BGStory });
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
    this.setState({ com: this.state.origin });
  };

  async componentDidMount() {
    this.props.com
      ? this.setState({ com: this.props.com, origin: this.props.com })
      : void 0;
    let getID = await process.env.REACT_APP_LineID;
    let getName = await process.env.REACT_APP_LineName;
    const { id } = this.props.match.params;
    const liff = window.liff;

    // if (!liff.isLoggedIn()) {
    //   const uri = window.location.href;
    //   sessionStorage.setItem("liffLoginRedirect", uri);
    //   liff.login();
    // } else {
    //   liff.getProfile().then((res) => {
    //     getID = res.userId;
    //   });
    // }

    await this.getMemberID(getID, getName, id);
  }

  render() {
    console.log("this.state.origin", this.state.origin);
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
