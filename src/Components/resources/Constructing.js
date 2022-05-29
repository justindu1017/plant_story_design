import React, { Component } from "react";
import pic from "../../img/res/construction.png";

export default class Constructing extends Component {
  render() {
    return (
      <div className="w-full bg-main h-100 d-flex flex-column justify-content-center">
        <div className="d-flex align-content-center">
          <img
            className="m-auto"
            alt="construction"
            src={pic}
            width="100"
            heigh="200"
          ></img>
          施工中...敬請期待~
        </div>
      </div>
    );
  }
}
