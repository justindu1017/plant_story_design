import React, { Component } from "react";

export default class Title extends Component {
  render() {
    return (
      <h1 className="d-flex justify-content-center align-items-center">
        {this.props.TitleContent}
      </h1>
    );
  }
}
