import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";

export default class BadgeShow extends Component {
  render() {
    return (
      <div className="w-full bg-main h-100 pt-3  mt-5">
        <div className="d-flex flex-wrap container">
          <h2>{this.props.storyInfo.storyTemplate.badge}</h2>
          <img
            src={
              require(`../../img/${this.props.storyInfo.storyTemplate.storyID}/badge/badge.png`)
                .default
            }
            className="w-100 my-2"
            alt={"badge"}
          ></img>
          <div className="my-3">
            <p>{this.props.storyInfo.storyTemplate.badgeDescription}</p>
          </div>
        </div>
        <FooterBanner rollBack={this.props.rollBack} from={"Badge"} />
      </div>
    );
  }
}
