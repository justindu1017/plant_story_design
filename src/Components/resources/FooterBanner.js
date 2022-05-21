import React, { Component } from "react";
import Background from "../backGround/Background";
import StorySub from "../storySub/StorySub";
import TaskPage from "../task/TaskPage";
import toFetch from "../../func/fetchC.js";

export default class FooterBanner extends Component {
  styleToShow = this.props.counter < 0 && !this.props.from ? "d-none" : "btn";
  // haveGOBACK = () => {
  //   const url =
  //     "http://localhost:5000/api/storyProgress/" + this.props.storyInfo._id;
  //   const num =
  //     this.props.storyInfo.subProgress > 3
  //       ? "4"
  //       : Number(this.props.storyInfo.subProgress) + 1;

  //   const head = {
  //     "Content-Type": "application/json",
  //   };
  //   const body = {
  //     subProgress: String(num),
  //   };

  //   const f = new toFetch(url, head, JSON.stringify(body));

  //   f.put();
  // };
  render() {
    return (
      <div className=" w-100 foot ">
        <div
          className={this.styleToShow}
          onClick={() => {
            this.props.counter === -1
              ? (window.location.href = this.props.from)
              : this.props.counter === 0
              ? this.props.rollBack(Background)
              : this.props.from === "Task"
              ? this.props.rollBack(TaskPage)
              : this.props.rollBack(StorySub);
          }}
        >
          ◀︎ 上一頁
        </div>
      </div>
    );
  }
}
