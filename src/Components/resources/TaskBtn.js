import React, { Component } from "react";
import TaskPage from "../task/TaskPage";

export default class TaskBtn extends Component {
  render() {
    return (
      <div className=" d-flex justify-content-center w-100 my-3">
        <button
          onClick={() => {
            this.props.changeActivity(TaskPage);
          }}
          className="btn btn-subStory w-100 rounded-3"
        >
          前往支線任務
        </button>
      </div>
    );
  }
}
