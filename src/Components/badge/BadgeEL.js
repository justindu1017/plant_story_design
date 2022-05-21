import React, { Component } from "react";
// import "../../style/badge.css";
import pic from "../../img/res/medal.png";

export default class BadgeEL extends Component {
  render() {
    // return <div className="flex-row-item">{this.props.img}</div>;
    return (
      <div className="flex-row-item">
        <img className="m-auto" alt="NOBADGE" src={pic}></img>
      </div>
    );
  }
}
