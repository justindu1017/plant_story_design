import React, { Component } from "react";
// import "../../style/badge.css";
import pic from "../../img/res/medal.png";

export default class BadgeEL extends Component {
  render() {
    console.log(this.props.storyInfo);
    // return <div className="flex-row-item">{this.props.img}</div>;
    return (
      <div className="flex-row-item d-flex my-2 justify-content-center ">
        {/* <img className="m-auto" alt="NOBADGE" src={pic}></img> */}

        <a href={"/badge/" + this.props._id}>
          <img
            src={
              require(`../../img/${this.props.storyID}/badge/badge.png`).default
            }
            width="100"
            heigh="200"
            className="float-end ms-2"
            alt={"徽章圖片"}
          ></img>
        </a>
      </div>
    );
  }
}
