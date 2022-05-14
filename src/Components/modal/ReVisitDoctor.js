import React, { Component } from "react";
import toFetch from "../../func/fetchC.js";
import StorySub from "../storySub/StorySub.js";

export default class ReVisitDoctor extends Component {
  displayCaution = () => {
    const Caution = document.getElementById("Caution");
    Caution.classList.remove("d-none");
  };

  haveGOBACK = async () => {
    const url =
      "http://localhost:5000/api/storyProgress/" + this.props.storyInfo._id;
    const num =
      this.props.storyInfo.subProgress > 3
        ? "4"
        : Number(this.props.storyInfo.subProgress) + 1;

    const head = {
      "Content-Type": "application/json",
    };
    const body = {
      subProgress: String(num),
    };
    const f = new toFetch(url, head, JSON.stringify(body));
    await f.put();
    this.props.getInfo();
    this.props.changeActivity(StorySub);
  };

  render() {
    return (
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                你做過復健了嗎?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla
                BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla BlaBlaBla
              </p>
              <div id="Caution" className="d-none">
                記得盡早去復健
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  this.displayCaution();
                }}
              >
                還沒耶
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  this.haveGOBACK();
                }}
              >
                已經做了
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
