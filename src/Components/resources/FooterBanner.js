import React, { Component } from "react";
import Background from "../backGround/Background";
import StorySub from "../storySub/StorySub";
import TaskPage from "../task/TaskPage";

export default class FooterBanner extends Component {
  styleToShow = this.props.counter < 0 ? "d-none" : "btn";

  render() {
    return (
      <div className=" w-100 foot ">
        <div
          className={this.styleToShow}
          onClick={() => {
            this.props.counter === 0
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
