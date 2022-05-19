import React, { Component } from "react";
import pic from "../../img/res/remove.png";

export default class NoBadgeEL extends Component {
  render() {
    return (
      <div className="flex-row-item d-flex my-3">
        <img
          className="m-auto"
          alt="NOBADGE"
          src={pic}
          width="100"
          heigh="200"
        ></img>
      </div>
    );
  }
}
