import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";

export default class Msg extends Component {
  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="msg" className="form-label">
                Email address
              </label>
              <br></br>
              <textarea
                className="form-control"
                id="msg"
                rows="4"
                cols="50"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <FooterBanner
          counter={this.props.counter}
          rollBack={this.props.rollBack}
          from="Task"
        />
      </div>
    );
  }
}
