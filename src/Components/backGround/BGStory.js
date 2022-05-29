import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";

export default class BGStory extends Component {
  changeLine = () => {};

  componentDidMount() {
    this.changeLine();
  }

  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container d-flex justify-content-around mb-3">
          <pre style={{ whiteSpace: "pre-line" }}>
            {`“si tu aimes une fleur qui se trouve dans un etoile, c'est doux, la
            nuit, de regarder le ciel.”
            如果你愛著一朵盛開在浩瀚星海裡的花，那麼，當你抬頭仰望繁星時，便會感到心滿意足。
            又一個日出。 小王子睜開雙眼、翻身爬向他的玫瑰。
            「你好久沒出去旅行了。」玫瑰說。 她哀傷地看著悉心照顧著自己的男孩。
            原先那麼活潑的小王子沉寂了下來，她已經記不清他上次歡笑的時候了。
            那一頭金髮好像能懂他心情似地、缺乏恣意與燦爛。
            「妳不好起來，我便沒有離開的道理。」他很堅持。
            小王子喜愛這個世界，但他被突然間枯萎的玫瑰給嚇壞了。
            自從那天起他便寸步不離，唯恐深愛的玫瑰在他不知道的時候又出狀況。
            吱呀一聲，溫室的門被打開。
            「孩子，其實玫瑰需要的不是你的緊張與擔憂，
            對於現階段的她來說，你的歷險故事與快樂才是最重要的。」
            穿著白袍的玫瑰醫生走了進來。`}
          </pre>
        </div>
        <div className="container pt-3 d-flex justify-content-center">
          <button
            className="btn w-100 btn-subStory text-center"
            onClick={() => {
              this.props.gotoMain();
            }}
          >
            前往下一頁故事
          </button>
        </div>
        <FooterBanner counter={this.props.counter} />
      </div>
    );
  }
}
