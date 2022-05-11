import React, { Component } from "react";
import ppc from "..\\..\\img\\res\\ppc.png";
import pp from "..\\..\\img\\res\\pp.png";
export default class CalProgress extends Component {
  countComplete = () => {
    let progress = 0;
    if (this.props.storyContent.storyTemplate.taskStory) progress += 1;
    for (
      let index = 0;
      index < this.props.storyContent.subProgress - 1;
      index++
    ) {
      progress += 1;
    }
    return progress;
  };
  render() {
    return (
      <div className="text-right">
        <div>
          {Array.from(Array(this.countComplete()), (e, i) => {
            return (
              <span key={i}>
                <img className="w-15" src={ppc} alt="ppc"></img>
              </span>
            );
          })}
          {Array.from(Array(4 - this.countComplete()), (e, i) => {
            return (
              <span key={i}>
                <img className="w-15" src={pp} alt="pp"></img>
              </span>
            );
          })}
        </div>
        <p>探索進度:{(this.countComplete() / 4) * 100}%</p>
      </div>
    );
  }
}
