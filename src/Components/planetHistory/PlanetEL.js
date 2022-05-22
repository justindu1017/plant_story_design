import React, { Component } from "react";
// import "../../style/badge.css";
import pic from "../../img/planetImg/planet.png";

export default class PlanetEL extends Component {
  render() {
    return (
      <div
        className="flex-row-item d-flex my-2 justify-content-center "
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        data-bs-whatever={this.props.id}
        data-bs-id={this.props.storyID}
      >
        <img
          src={
            require(`../../img/${this.props.storyID}/planet/planet.png`).default
          }
          className="float-end ms-2"
          alt={"星球圖片"}
        ></img>
      </div>
    );
  }
}
