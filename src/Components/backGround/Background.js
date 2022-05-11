import React, { Component } from "react";
import CalProgress from "../resources/CalProgress";
import Title from "../resources/Title";
import pic from "..\\..\\img\\planetImg\\planet-earth.png";
import FooterBanner from "../resources/FooterBanner";
import GotoNextPage from "../resources/GotoNextPage";
import NoNextPage from "../resources/NoNextPage";
import TaskBtn from "../resources/TaskBtn";

export default class Background extends Component {
  render() {
    console.log(this.props.storyInfo.subProgress === "1");

    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container d-flex justify-content-around mb-3">
          <Title TitleContent={this.props.storyInfo.storyTemplate.name} />
          <CalProgress storyContent={this.props.storyInfo.storyTemplate} />
        </div>
        <div className="container mb-5">
          <img className="float-end w-30 ms-2" src={pic} alt="星球圖片"></img>

          <div>{this.props.storyInfo.storyTemplate.background}</div>

          {this.props.storyInfo.subProgress === "1" ? (
            <NoNextPage />
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
        />
      </div>
    );
  }
}
