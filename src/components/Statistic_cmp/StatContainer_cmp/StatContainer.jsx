import React from "react";
import { Badge } from "@sberdevices/plasma-ui";
import { Timer } from "../Timer_cmp/Timer";

export default class StatContainer extends React.Component {
  endGame = () => {
    this.props.endGame();
  };
  render() {
    return (
      <div>
        <Badge
          text={`Сказано имён: ${this.props.сount}`}
          size="l"
          style={{ width: "150px", margin: "30px auto" }}
        />
        <Timer endGame={this.endGame} update={this.props.update}/>
      </div>
    );
  }
}
