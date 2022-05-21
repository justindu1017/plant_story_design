import React, { Component } from "react";
import pic from "../../img/res/remove.png";

export default class NoPlanetEL extends Component {
  render() {
    return (
      <div className="flex-row-item d-flex my-2">
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
