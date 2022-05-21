import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";
import Msg from "./Msg";
import pic from "../../img/res/campus.png";
import BGPic from "../../img/res/BGPic.jpg";

export default class TaskPage extends Component {
  render() {
    return (
      <div className="w-full bg-main h-100">
        <div className="h-25">
          <img src={BGPic} alt="BGPic" className="w-100"></img>
        </div>
        <div className="container pt-3">
          <div>
            <div>
              <span>
                <img src={pic} className="w-10" alt="campus"></img>
              </span>
              實業家任務
            </div>

            <div>
              <span>
                <img src={pic} className="w-10" alt="campus"></img>
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
          origin={this.props.origin}
        />
      </div>
    );
  }
}
