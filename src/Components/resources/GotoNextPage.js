import React, { Component } from "react";
import StorySub from "../storySub/StorySub";
import pic from "../../img/res/storytelling.png";

export default class GotoNextPage extends Component {
  render() {
    return (
      <div className=" d-flex justify-content-center w-100 my-3">
        <button
          className="btn btn-mainStory w-100 rounded-3"
          onClick={() => {
            this.props.changeActivity(StorySub);
          }}
        >
          <img className="w-5 text-white me-3" src={pic} alt="翻頁"></img>
          翻開下一頁故事
        </button>
      </div>
    );
  }
}
