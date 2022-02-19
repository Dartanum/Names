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
    const isPhone = this.props.isPhone;

    return (
      <div>
        <Badge
          text={`Сказано имён: ${this.props.сount}`}
          size="l"
          style={isPhone ? {margin: "5px auto", fontSize: "9px", height: "20px"} : {margin: "15px auto" }}
        />
        <Timer 
          isPhone={isPhone}
          endGame={this.endGame} 
          update={this.props.update} 
          isPause={this.props.isPause}
          assistantSayTime={this.props.assistantSayTime}
          assistantSay={this.assistantSay}
          existPauseRequest={this.props.existPauseRequest}
          allowPause={this.props.allowPause}
          pause={this.props.pause}
          isWin={this.props.isWin}
          restarted={this.props.restarted}
          isEndGame={this.props.isEndGame}
        />
      </div>
    );
  }
}
