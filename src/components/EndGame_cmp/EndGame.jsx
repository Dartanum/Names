import React from "react";
import { Button, Card, CardBody, CardContent, CardHeadline1, Badge } from "@sberdevices/plasma-ui";
import {
  IconClose,
  IconRefresh,
} from "@sberdevices/plasma-icons";
import "./EndGame.css";

let edited = false;
const officialTitle = {
  win: "Вы победили!",
  lose: "Вы проиграли",
}
const unofficialTitle = {
  win: "Ты победил!",
  lose: "Ты проиграл",
}
export class EndGame extends React.Component {

  clickRestart = () => {
    edited = false;
    this.props.restart();
  };

  clickClose = () => {
    this.props.exit();
  };

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.isEndGame && !edited) {
      edited = true;
      return true;
    }
    return false;
  }
  render() {
    console.log(this.props.character);
    let nameCount = this.props.count;
    let result = this.props.character === "joy" ? unofficialTitle : officialTitle;
    return (
      <Card className="card-container" style={{ zIndex: 21 }}>
        <CardBody>
          <CardContent>
            <CardHeadline1>{this.props.isWin ? result.win : result.lose}</CardHeadline1>
            <Badge
                text={`Сказано имён: ${nameCount}`}
                size="l"
                style={{margin: "30px auto" }}
            />
            <div className="btn-container">
              <Button
                style={{"marginRight": "15px"}}
                size="l"
                view="warning"
                pin="circle-circle"
                contentLeft={<IconRefresh size="l" />}
                onClick={this.clickRestart}
              />
              <Button
              style={{"marginLeft": "15px"}}
                size="l"
                view="critical"
                pin="circle-circle"
                contentLeft={<IconClose size="l" />}
                onClick={this.clickClose}
              />
            </div>
          </CardContent>
        </CardBody>
      </Card>
    );
  }
}
