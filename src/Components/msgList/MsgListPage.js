import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";
import MsgEL from "./MsgEL";

export default class MsgListPage extends Component {
  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container">
          {this.props.storyInfo.taskMessages.map((el) => {
            return <MsgEL msgObj={el} />;
          })}
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
