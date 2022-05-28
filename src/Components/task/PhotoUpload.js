import React, { Component } from "react";
import toFetch from "../../func/fetchC.js";
import MsgEL from "./MsgEL";
import FooterBanner from "../resources/FooterBanner";

export default class PhotoUpload extends Component {
  state = {
    file: "",
  };

  handleUpload = (event) => {
    this.setState({ file: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  sendPic = () => {
    console.log(this.state);
    const obj = {
      taskComplete: "true",

      taskPhoto: this.state.file,
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

    toStoryProgress.put().catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container ">
          {/* <form> */}
          <div className="mb-3">
            <h3 htmlFor="msg" className="form-label">
              {/* {this.props.storyInfo.storyTemplate.task} */}
            </h3>
            <br></br>
            <input
              type="file"
              id="image-input"
              accept="image/jpeg, image/png, image/jpg"
              onChange={this.handleUpload}
            ></input>
          </div>
          <button
            onClick={() => {
              this.sendPic();
            }}
            // type="submit"
            className={this.style}
          >
            Submit
          </button>
          {/* </form> */}

          {/* {this.props.storyInfo.taskMessages.reverse().map((el) => {
            // return
            return <MsgEL msgObj={el} />;
          })} */}
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
