import React, { Component } from "react";
import FooterBanner from "../resources/FooterBanner";

export default class EndStory extends Component {
  render() {
    return (
      <div className="w-full bg-main h-100 pt-3">
        <div className="container d-flex justify-content-around mb-3">
          「對我來說,你和其他的小男孩沒有什麼區別，我不需要你、你也不需要我。對你來說，我也只不過是一隻狐狸罷了，和其他的狐狸一樣。但是，如果你收服了我，我們之間就會有某種關係，我們就離不開彼此了。」
          「對我來說你是世界的唯一，對你來說我也是世界的唯一。」
          「只有用心去看，你才能看見一切，因為真正重要的東西是用眼睛看不見的。」
          小狐狸抱緊了小王子，宇宙的微風拂過他們的側臉。
        </div>

        <FooterBanner counter={this.props.counter} />
      </div>
    );
  }
}
