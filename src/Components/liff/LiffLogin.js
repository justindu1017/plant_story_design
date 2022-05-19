import React, { Component } from "react";

export default class LiffLogin extends Component {
  async componentDidMount() {
    (async () => {
      const liff = window.liff;

      await liff.init({ liffId: "1656053787-a6qvwxW7" });
      // if (new URL(window.location).searchParams.get("liff.state")) return;
      const liffLoginRedirect = sessionStorage.getItem("liffLoginRedirect");
      if (liffLoginRedirect) {
        sessionStorage.removeItem("liffLoginRedirect");
        window.location.href = liffLoginRedirect;
      }
    })();
  }

  render() {
    return <div></div>;
  }
}
