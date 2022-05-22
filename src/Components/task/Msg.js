import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";
import toFetch from "../../func/fetchC.js";
import MsgEL from "./MsgEL";

export default class Msg extends Component {
  getInfo = (memberID) => {
    this.props.getInfo(memberID);
  };

  sendMsg = (e) => {
    // e.preventDefault();
    const obj = {
      taskComplete: "true",

      taskMessages: [
        ...this.props.storyInfo.taskMessages,
        {
          m_timestamp: "2022-04-24T15:58:31.777Z",
          message: document.getElementById("msg").value,
        },
      ],
    };

    const toStoryProgress = new toFetch(
      "http://localhost:5000/api/storyProgress/" + this.props.storyInfo._id,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(obj)
    );

    const toStoryTemplate = new toFetch(
      "http://localhost:5000/api/storyTemplate/" +
        this.props.storyInfo.storyTemplate._id,
      {
        "Content-Type": "application/json",
      },
      JSON.stringify(obj)
    );

    toStoryProgress
      .put()
      .then((res) => {
        res.json();
      })
      .then((res) => {
        return toStoryTemplate.put();
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.getInfo(this.props.storyInfo.member._id);
      })
      .catch(function (e) {});
  };

  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container">
          {/* <form> */}
          <div className="mb-3">
            <label htmlFor="msg" className="form-label">
              Email address
            </label>
            <br></br>
            <textarea
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
            className="btn btn-primary"
          >
            Submit
          </button>
          {/* </form> */}

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
