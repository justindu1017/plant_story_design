import React, { Component } from "react";
import toFetch from "../../func/fetchC.js";

export default class TheEndBtn extends Component {
  pad(number, length) {
    var str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }

    return str;
  }

  getNextTemplate = async () => {
    const nextStoryID = this.pad(
      Number(this.props.storyInfo.storyTemplate.storyID) + 1,
      3
    );

    const getNextStoryID = new toFetch(
      "http://localhost:5000/api/storyTemplate/getByStoryID",
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

    this.props.getInfo(this.props.storyInfo.member._id);
    this.props.resetState();
  };

  setCompletion = async (currerentID) => {
    const setComplete = new toFetch(
      "http://localhost:5000/api/storyProgress/" + currerentID,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({
        completion: "true",
        prelude: "true",
      })
    );

    await setComplete.put().catch(() => {});
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
      "http://localhost:5000/api/storyProgress/",
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
            this.getNextTemplate();
          }}
        >
          The End
        </button>
      </div>
    );
  }
}
