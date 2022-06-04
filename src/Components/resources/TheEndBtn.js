import React, { Component } from "react";
import toFetch from "../../func/fetchC.js";
require("dotenv").config();

export default class TheEndBtn extends Component {
  pad(number, length) {
    number = number === 5 ? 6 : number;
    number = number === 7 ? 12 : number;

    var str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }

    return str;
  }

  delProcess = async (PID) => {
    console.log("del = ", PID);
    // del Process
    const delProcess = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/" + PID,
      {
        "Content-Type": "application/json",
      }
    );

    delProcess.delete().catch((err) => console.log(err));
  };

  getNextTemplate = async () => {
    // const allList = await this.checkAllFinished(
    //   this.props.storyInfo.member._id
    // );

    // let counter = 0;
    // let needPass = false;

    // allList.map((element) => {
    //   element.storyTemplate.storyID ===
    //     this.props.storyInfo.storyTemplate.storyID &&
    //   element.subProgress === "4"
    //     ? // del Process
    //       (counter += 1)
    //     : //
    //       void 0;
    //   console.log(counter);
    //   counter >= 2 ? (needPass = true) : void 0;
    // });

    const nextStoryID = this.pad(
      Number(this.props.storyInfo.storyTemplate.storyID) + 1,
      3
    );

    const getNextStoryID = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyTemplate/getByStoryID",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ storyID: String(nextStoryID) })
    );
    const _id = await getNextStoryID
      .post()
      .then((res) => res.json())
      .then((res) => {
        return res[0]._id;
      });

    await this.setCompletion(this.props.storyInfo._id);
    await this.bindNextStory(_id, this.props.storyInfo.member._id);

    // needPass ? await this.delProcess(this.props.storyInfo._id) : void 0;

    this.props.getInfo(this.props.storyInfo.member._id);
    this.props.resetState();
  };

  setCompletion = async (currerentID) => {
    const allList = await this.checkAllFinished(
      this.props.storyInfo.member._id
    );

    let counter = 0;
    let needPass = false;

    allList.map((element) => {
      element.storyTemplate.storyID ===
        this.props.storyInfo.storyTemplate.storyID &&
      element.subProgress === "4"
        ? // del Process
          (counter += 1)
        : //
          void 0;
      counter >= 2 ? (needPass = true) : void 0;
    });

    const setComplete = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/" + currerentID,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({
        completion: "true",
        prelude: "true",
      })
    );

    await setComplete.put().catch(() => {});
    needPass ? await this.delProcess(this.props.storyInfo._id) : void 0;
  };

  checkAllFinished = async (memberID) => {
    const getAll = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/getByMember",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ member: memberID })
    );
    const allList = await getAll
      .post()
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    return allList;
  };

  theEnd = async () => {
    await this.setCompletion(this.props.storyInfo._id);
    this.props.resetState();
    this.props.theEnd();
  };

  bindNextStory = async (storyTemplateID, memberID) => {
    const bd = {
      storyTemplate: storyTemplateID,
      member: memberID,
      //!!! set to 4 to avoid modal
      subProgress: "4",
      badge: "",
      taskMessages: [],
      taskPhoto: "",
      taskComplete: "",
      completion: "false",
    };

    const bind = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(bd)
    );

    await bind.post().catch(() => {});
  };

  render() {
    return (
      <div className=" d-flex justify-content-center w-100 my-3">
        <button
          className="btn btn-mainStory w-100 rounded-3"
          onClick={() => {
            this.props.storyInfo.storyTemplate.storyID === "012"
              ? this.theEnd()
              : this.getNextTemplate();
          }}
        >
          The End
        </button>
      </div>
    );
  }
}
