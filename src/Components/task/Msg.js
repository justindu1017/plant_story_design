import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";
import toFetch from "../../func/fetchC.js";
import MsgEL from "./MsgEL";
require("dotenv").config();

export default class Msg extends Component {
  getInfo = async (mID, sID) => {
    await this.props.getInfo(mID, sID);
  };

  sendMsg = async (e) => {
    const time = new Date().toISOString();
    const obj = {
      taskComplete: "true",

      taskMessages: [
        ...this.props.storyInfo.taskMessages,
        {
          m_timestamp: time,
          message: document.getElementById("msg").value,
        },
      ],
    };

    const toStoryProgress = new toFetch(
      process.env["REACT_APP_BackendUri"] +
        "/api/storyProgress/" +
        this.props.storyInfo._id,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(obj)
    );

    // TODO 先fetch Template的MSG
    const getStoryTemplate = new toFetch(
      process.env["REACT_APP_BackendUri"] +
        "/api/storyTemplate/" +
        this.props.storyInfo.storyTemplate._id,
      {
        "Content-Type": "application/json",
      },
      null
    );

    let getMsg = await getStoryTemplate
      .get()
      .then((res) => res.json())
      .then((res) => {
        return res.taskMessages;
      });

    let tmpObj = {
      taskMessages: [
        ...getMsg,
        {
          m_timestamp: time,
          message: document.getElementById("msg").value,
        },
      ],
    };

    const toStoryTemplate = new toFetch(
      process.env["REACT_APP_BackendUri"] +
        "/api/storyTemplate/" +
        this.props.storyInfo.storyTemplate._id,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(tmpObj)
    );

    await toStoryProgress.put();
    await toStoryTemplate.put();
    await this.getInfo(
      this.props.storyInfo.member._id,
      this.props.storyInfo._id
    );
    // this.props.getInfo(this.props.storyInfo.member._id)();
    document.getElementById("msg").value = "";
  };

  style = this.props.id ? "d-none btn btn-primary" : "btn btn-primary";

  render() {
    console.log(this.props.storyInfo);
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container ">
          {/* <form> */}
          <div className="mb-3">
            <h3 htmlFor="msg" className="form-label">
              {this.props.storyInfo.storyTemplate.task}
            </h3>
            <br></br>
            <textarea
              // className={this.props.id ? "d-none" : "form-control"}
              className="form-control"
              id="msg"
              rows="4"
              cols="50"
            ></textarea>
          </div>
          <button
            onClick={() => {
              this.sendMsg();
            }}
            // type="submit"
            // className={this.style}
            className={"btn btn-primary"}
          >
            Submit
          </button>

          {this.props.storyInfo.taskMessages.reverse().map((el) => {
            // return
            return <MsgEL msgObj={el} />;
          })}
        </div>
        <FooterBanner
          counter={this.props.counter}
          rollBack={this.props.rollBack}
          origin={this.props.origin}
          from="Task"
        />
      </div>
    );
  }
}
