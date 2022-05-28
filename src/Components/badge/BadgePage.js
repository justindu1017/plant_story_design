import React, { Component } from "react";
import BadgeEL from "./BadgeEL";
import NoBadgeEL from "./NoBadgeEL";
import toFetch from "../../func/fetchC.js";
require("dotenv").config();

export default class BadgePage extends Component {
  state = {
    memberInfo: [],
  };

  getMemberByLineID = async (LineID) => {
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

    if (ret.length >= 1) {
      return ret[0];
    }
  };

  async componentDidMount() {
    // get line id
    let Envir = await process.env["REACT_APP_Envir"];

    const infoArr = !(Envir == "development")
      ? await this.props.liffLogin()
      : [
          await process.env["REACT_APP_LineID"],
          await process.env["REACT_APP_LineName"],
        ];

    // let getID = await process.env.REACT_APP_LineID;
    let memberID = await this.getMemberByLineID(infoArr[0]);
    let memberInfo = await this.doFetch(memberID)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
    memberInfo = this.resize(memberInfo, 12);
    this.setState({ memberInfo: memberInfo });
  }

  render() {
    return (
      <div className="w-full bg-main h-100 pt-3  mt-5">
        <div className="d-flex flex-wrap container">
          {this.state.memberInfo.map((el) => {
            if (el) {
              if (el.taskComplete === "true") {
                return <BadgeEL storyID={el.storyTemplate.storyID} />;
              }
            }
            return <NoBadgeEL />;
          })}
        </div>
      </div>
    );
  }
  doFetch = (memberID) => {
    // fetch from server by memberID
    return fetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/getByMember",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ member: memberID }),
      }
    );
  };
  resize = (arr, newSize) => {
    while (newSize > arr.length) arr.push(null);
    arr.length = newSize;
    return arr;
  };
}
