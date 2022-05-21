import React, { Component } from "react";
// import "../../style/badge.css";
import pic from "../../img/planetImg/planet-earth.png";

export default class PlanetEL extends Component {
  render() {
    return (
      <div
        className="flex-row-item d-flex my-2"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        data-bs-whatever={this.props.id}
      >
        {/* {this.props.img} */}
        <img
          className="m-auto"
          alt="NOPlanet"
          src={pic}
          width="100"
          heigh="200"
        ></img>
      </div>
    );
  }
}
