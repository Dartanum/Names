import React from "react";
import { Badge } from "@sberdevices/plasma-ui";
import { Timer } from "../Timer_cmp/Timer";

export default class StatContainer extends React.Component {
  endGame = () => {
    this.props.endGame();
  };
  assistantSay = () => {
    this.props.assistantSay();
  }

  render() {
    return (
      <div>
        <Badge
          text={`Сказано имён: ${this.props.сount}`}
          size="l"
          style={{margin: "30px auto" }}
        />
        <Timer 
          endGame={this.endGame} 
          update={this.props.update} 
          isPause={this.props.isPause}
          assistantSayTime={this.props.assistantSayTime}
          assistantSay={this.assistantSay}
        />
      </div>
    );
  }
}
