import React, { Component } from "react";
import CalProgress from "../resources/CalProgress";
import Title from "../resources/Title";
import pic from "../../img/003/storyImg/3.png";
import FooterBanner from "../resources/FooterBanner";
import GotoNextPage from "../resources/GotoNextPage";
import NoNextPage from "../resources/NoNextPage";
import TaskBtn from "../resources/TaskBtn";
const path = require("path");
export default class Background extends Component {
  state = {
    path: "1.png",
  };

  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container d-flex justify-content-around mb-3">
          <Title TitleContent={this.props.storyInfo.storyTemplate.name} />
          <CalProgress storyContent={this.props.storyInfo} />
        </div>
        <div className="container mb-5">
          <img
            src={
              require(`../../img/${this.props.storyInfo.storyTemplate.storyID}/planet/planet.png`)
                .default
            }
            className="float-end w-30 ms-2"
            alt={"星球圖片"}
          ></img>
          <div>{this.props.storyInfo.storyTemplate.background}</div>

          {this.props.storyInfo.subProgress === "1" ? (
            <NoNextPage
              storyInfo={this.props.storyInfo}
              counter={this.props.counter}
              changeActivity={this.props.changeActivity}
              getInfo={this.props.getInfo}
            />
          ) : (
            <GotoNextPage
              counter={this.props.counter}
              changeActivity={this.props.changeActivity}
            />
          )}

          <hr></hr>

          <div>
            <h3>支線任務</h3>
            <div>{this.props.storyInfo.storyTemplate.taskStory}</div>
            <TaskBtn changeActivity={this.props.changeActivity} />
          </div>
        </div>
        <FooterBanner
          counter={this.props.counter}
          rollBack={this.props.rollBack}
          storyInfo={this.props.storyInfo}
          origin={this.props.origin}
          from={this.props.from}
        />
      </div>
    );
  }
}
