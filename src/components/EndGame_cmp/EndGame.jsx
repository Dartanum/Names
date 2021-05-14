import React from "react";
import { Button, Card, CardBody, CardContent, CardHeadline1, Badge } from "@sberdevices/plasma-ui";
import {
  IconClose,
  IconRefresh,
} from "@sberdevices/plasma-icons";
import "./EndGame.css";

export class EndGame extends React.Component {

  state = {
    isRestart: false,
    isExit: false,
  };

  clickRestart = () => {
    this.props.restart();
  };

  clickClose = () => {
    this.setState({
      isRestart: this.state.isRestart,
      isExit: !this.state.isExit,
    });
  };

  render() {
    let nameCount = this.props.count;
    return (
      <Card className="card-container" style={{ zIndex: 21 }}>
        <CardBody>
          <CardContent>
            <CardHeadline1>{this.props.isWin ? "Вы победили!" : "Вы проиграли!"}</CardHeadline1>
            <Badge
                text={`Сказано имён: ${nameCount}`}
                size="l"
                style={{ width: "150px", margin: "30px auto" }}
            />
            <div className="btn-container">
              <Button
                style={{"margin-right": "15px"}}
                size="l"
                view="warning"
                pin="circle-circle"
                contentLeft={<IconRefresh size="l" />}
                onClick={this.clickRestart}
              />
              <Button
              style={{"margin-left": "15px"}}
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
