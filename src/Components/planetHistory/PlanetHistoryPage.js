import React, { Component } from "react";
import PlanetEL from "./PlanetEL";
import NoPlanetEL from "./NoPlanetEL";
import pic from "../../img/planetImg/planet.png";
import chat from "../../img/res/chat.png";
import toFetch from "../../func/fetchC.js";
require("dotenv").config();

export default class PlanetHistoryPage extends Component {
  state = {
    memberInfo: [],
  };

  getMemberByLineID = async (LineID) => {
    let ret;
    const FetchlineID = new toFetch(
      process.env["REACT_APP_BackendUri"] + "/api/member/getByLineID/",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ lineID: LineID })
    );

    await FetchlineID.post()
      .then((res) => res.json())
      .then((res) => {
        ret = res;
      });

    if (ret.length >= 1) {
      return ret[0];
    }
  };

  doFetchStoryID = async (storyID) => {
    // fetch from server by memberID
    return fetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/" + storyID,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  async componentDidMount() {
    let getID = await process.env.REACT_APP_LineID;
    const memberID = await this.getMemberByLineID(getID);
    let memberInfo = await this.doFetch(memberID)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
    memberInfo = this.resize(memberInfo, 12);
    this.setState({ memberInfo: memberInfo });

    document
      .getElementById("staticBackdrop")
      .addEventListener("show.bs.modal", function (event) {
        var button = event.relatedTarget;
        var recipient = button.getAttribute("data-bs-whatever");
        var pImg = this.querySelector("#pImg");
        pImg.src = require(`../../img/${button.getAttribute(
          "data-bs-id"
        )}/planet/planet.png`).default;

        var toPlanet = this.querySelector("#toPlanet");
        toPlanet.href = recipient;

        var toMsg = this.querySelector("#toMsg");
        toMsg.href = "/msg/" + recipient;
      });
  }

  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="d-flex flex-wrap container">
          {this.state.memberInfo.map((el) => {
            if (el && el.completion === "true") {
              return (
                <PlanetEL
                  storyID={el.storyTemplate.storyID}
                  img={el.badge}
                  id={el._id}
                />
              );
            } else {
              return <NoPlanetEL />;
            }
          })}

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
                    想要前往何處?
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body d-flex justify-content-between">
                  <a
                    className="btn bg-info bg-opacity-25 border-primary"
                    id="toPlanet"
                    href=""
                  >
                    <img
                      id="pImg"
                      width="100"
                      heigh="50"
                      className="float-end ms-2"
                      alt={"星球圖片"}
                    ></img>
                    {/* <img
                      className="m-auto"
                      alt="NOPlanet"
                      src={pic}
                      width="100"
                      heigh="50"
                    ></img> */}
                    <div>星球</div>
                  </a>

                  <a
                    className="btn bg-info bg-opacity-25 border-primary"
                    id="toMsg"
                    href=""
                  >
                    <img
                      className="m-auto"
                      alt="NOPlanet"
                      src={chat}
                      width="100"
                      heigh="50"
                    ></img>
                    <div>留言</div>
                  </a>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  doFetch = (memberID) => {
    // fetch from server by memberID
    return fetch(
      process.env["REACT_APP_BackendUri"] + "/api/storyProgress/getByMember",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ member: memberID }),
      }
    );
  };
  resize = (arr, newSize) => {
    while (newSize > arr.length) arr.push(null);
    arr.length = newSize;
    return arr;
  };
}
