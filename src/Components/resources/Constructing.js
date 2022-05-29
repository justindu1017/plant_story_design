import React, { Component } from "react";
import pic from "../../img/res/construction.png";
import FooterBanner from "./FooterBanner";

export default class Constructing extends Component {
  render() {
    return (
      <div className="w-full bg-main h-100 d-flex flex-column justify-content-center">
        <div className="align-content-center">
          <div className="d-flex">
            <img
              className="m-auto"
              alt="construction"
              src={pic}
              width="100"
              heigh="200"
            ></img>
          </div>
          <div className=" d-flex justify-content-center align-items-center fs-2">
            施工中...敬請期待~
          </div>
        </div>
        <FooterBanner
          counter={this.props.counter}
          rollBack={this.props.rollBack}
          origin={this.props.origin}
          from="Task"
        />
      </div>
    );
  }
}
