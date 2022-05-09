import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";
import Msg from "./Msg";

export default class TaskPage extends Component {
  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="h-25">我是圖片</div>
        <div className="container">
          <div>
            <div>
              <span>
                <img alt="campus"></img>
              </span>
              實業家任務
            </div>

            <div>
              <span>
                <img alt="campus"></img>
              </span>
              晚上時間在空曠戶外行走並記錄行走步數
            </div>

            <div className=" container d-flex justify-content-center w-100 my-3">
              <button
                onClick={() => {
                  this.props.changeActivity(Msg);
                }}
                className=" btn text-white w-75 rounded-3 bg-MissionStart"
              >
                任務開始
              </button>
            </div>
          </div>

          <hr></hr>
          <div>
            <h4>故事背景</h4>
            <div>{this.props.storyInfo.storyTemplate.taskStory}</div>
          </div>
        </div>
        <FooterBanner
          counter={this.props.counter}
          rollBack={this.props.rollBack}
        />
      </div>
    );
  }
}
