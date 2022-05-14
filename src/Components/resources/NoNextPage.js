import React, { Component } from "react";
import ReVisitDoctor from "../modal/ReVisitDoctor";
import pic from "..\\..\\img\\res\\storytelling.png";

export default class NoNextPage extends Component {
  render() {
    return (
      <div className=" d-flex justify-content-center w-100 my-3">
        <button
          className="btn btn-mainStory w-100 rounded-3"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          故事未完待續… <br></br>您可以前往復健來取得接下來的故事
        </button>
        <ReVisitDoctor
          counter={this.props.counter}
          changeActivity={this.props.changeActivity}
          storyInfo={this.props.storyInfo}
          getInfo={this.props.getInfo}
        />
      </div>
    );
  }
}
