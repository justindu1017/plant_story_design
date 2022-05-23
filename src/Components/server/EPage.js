import React, { Component } from "react";
require("dotenv").config();

export default class EPage extends Component {
  send(e) {
    e.preventDefault();
    const storyID = document.getElementById("storyID").value;
    const name = document.getElementById("name").value;
    const background = document.getElementById("background").value;
    const storyMain = document.getElementById("storyMain").value;
    const storySub1 = document.getElementById("storySub1").value;
    const storySub2 = document.getElementById("storySub2").value;
    const storySub3 = document.getElementById("storySub3").value;
    const task = document.getElementById("task").value;
    const taskStory = document.getElementById("taskStory").value;
    const badge = document.getElementById("badge").value;

    let body = {};
    body.storyID = storyID;
    body.name = name;
    body.background = background;
    body.storyMain = storyMain;
    let storySub = [];
    storySub.push(storySub1);
    storySub.push(storySub2);
    storySub.push(storySub3);

    body.storySub = storySub;
    body.task = task;
    body.taskStory = taskStory;
    body.badge = badge;

    fetch(process.env["REACT_APP_BackendUri"] + "/api/storyTemplate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {});
    window.location.reload(false);
  }

  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="storyID" className="form-label">
                storyID
              </label>
              <input
                className="form-control"
                autocomplete="off"
                id="storyID"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                name
              </label>
              <input
                className="form-control"
                autocomplete="off"
                id="name"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="background" className="form-label">
                background
              </label>
              <input
                className="form-control"
                autocomplete="off"
                id="background"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="storyMain" className="form-label">
                storyMain
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="storyMain"
                autocomplete="off"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="storySub1" className="form-label">
                storySub1
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="storySub1"
                autocomplete="off"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="storySub2" className="form-label">
                storySub2
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="storySub2"
                autocomplete="off"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="storySub3" className="form-label">
                storySub3
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="storySub3"
                autocomplete="off"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="task" className="form-label">
                task
              </label>
              <textarea
                className="form-control"
                rows={5}
                autocomplete="off"
                id="task"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="taskStory" className="form-label">
                taskStory
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="taskStory"
                autocomplete="off"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="badge" className="form-label">
                badge
              </label>
              <input
                className="form-control"
                autocomplete="off"
                id="badge"
              ></input>
            </div>
            <button onClick={this.send} className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
