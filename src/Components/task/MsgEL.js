import React, { Component } from "react";

export default class MsgEL extends Component {
  render() {
    return (
      <div className="border border-white border-3 bg-white bg-opacity-50 text-break my-2 rounded-3 p-2">
        <div>{this.props.msgObj.m_timestamp}</div>
        <div>
          <pre className="fs-5" style={{ whiteSpace: "pre-line" }}>
            {this.props.msgObj.message}
          </pre>
        </div>
      </div>
    );
  }
}
