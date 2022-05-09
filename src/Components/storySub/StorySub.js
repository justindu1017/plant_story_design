import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";
import GotoNextPage from "../resources/GotoNextPage";
import NoNextPage from "../resources/NoNextPage";
import pic from "..\\..\\img\\storyImg\\pict.png";

export default class StorySub extends Component {
  render() {
    return (
      <div className=" bg-main h-100">
        <div className="container pt-5">
          <p>
            {this.props.storyInfo.storyTemplate.storySub[this.props.counter]}
          </p>
          <img className="w-100" src={pic} alt="故事圖片"></img>
        </div>
        {this.props.storyInfo.storyTemplate.storySub.length - 1 >
        this.props.counter ? (
          <GotoNextPage
            counter={this.props.counter}
            changeActivity={this.props.changeActivity}
          />
        ) : this.props.counter === 2 ? (
          <div></div>
        ) : (
          <NoNextPage />
        )}
        <FooterBanner
          counter={this.props.counter}
          rollBack={this.props.rollBack}
        />
      </div>
    );
  }
}
