import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";
import GotoNextPage from "../resources/GotoNextPage";
import NoNextPage from "../resources/NoNextPage";
import pic from "..\\..\\img\\storyImg\\pict.png";

export default class StorySub extends Component {
  render() {
    return (
      <div className=" bg-main h-100">
        <div className="container pt-5 h-60 overflow-scroll">
          <p>
            {this.props.storyInfo.storyTemplate.storySub[this.props.counter]}
          </p>
        </div>
        <div className="container">
          <img
            className="w-75 d-flex center ms-auto me-auto"
            src={pic}
            alt="故事圖片"
          ></img>

          {this.props.storyInfo.subProgress - 2 > this.props.counter ? (
            <GotoNextPage
              counter={this.props.counter}
              changeActivity={this.props.changeActivity}
            />
          ) : this.props.counter === 2 ? (
            <div></div>
          ) : (
            <NoNextPage />
          )}
        </div>

        <FooterBanner
          counter={this.props.counter}
          rollBack={this.props.rollBack}
          storyInfo={this.props.storyInfo}
        />
      </div>
    );
  }
}
