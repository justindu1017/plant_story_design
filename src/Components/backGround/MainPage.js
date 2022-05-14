import React, { Component } from "react";
import Background from "./Background";
import toFetch from "../../func/fetchC.js";

export default class MainPage extends Component {
  state = {
    com: Background,
    counter: -1,
    storyInfo: {
      _id: "",
      storyTemplate: {
        _id: "",
        storyID: "",
        name: "",
        background: "",
        storyMain: "",
        storySub: [],
        task: "",
        taskStory: "",
        badge: "",
        taskMessages: [],
      },
      member: {
        _id: "",
        name: "",
      },
      subProgress: "",
      badge: "",
      taskMessages: [],
      taskPhoto: "",
      completion: "",
      create_date: "",
      __v: "",
    },
  };

  getInfo = async () => {
    const memberID = await process.env.REACT_APP_MemberID;
    const FetchgetActiveStory = new toFetch(
      "http://localhost:5000/api/storyProgress/getActiveStory",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ member: memberID })
    );
    FetchgetActiveStory.post()
      .then((res) => res.json())
      .then((res) => {
        this.setState({ storyInfo: res[0] });
      });
  };

  resetState = () => {
    this.setState({ counter: -1 });
    this.setState({ com: Background });
  };

  async componentDidMount() {
    await this.getInfo();
  }

  changeActivity = (com) => {
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ com: com });
  };
  rollBack = (com) => {
    this.setState({ counter: this.state.counter - 1 });
    this.setState({ com: com });
  };

  render() {
    return (
      <this.state.com
        counter={this.state.counter}
        storyInfo={this.state.storyInfo}
        changeActivity={this.changeActivity}
        rollBack={this.rollBack}
        getInfo={this.getInfo}
        resetState={this.resetState}
      />
    );
  }
}
