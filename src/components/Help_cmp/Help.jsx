import React from 'react'
import {Card, CardBody, CardContent, Button, CardHeadline1, CardParagraph2} from "@sberdevices/plasma-ui"
import "../App_cmp/App.css"
import "../EndGame_cmp/EndGame.css"

export class Help extends React.Component {

    clickClose = () => {
        this.props.help();
    }
    render() {
        return(
        <div
          className="fill-container"
          style={{ display: this.props.helpCalled && this.props.isPause ? "flex" : "none" }}
        >
            <Card className="card-container" style={{ zIndex: 21, width: "100%" }}>
                <CardBody>
                <CardContent>
                    <CardHeadline1 style={{"textAlign": "center"}}>Правила</CardHeadline1>
                    <CardParagraph2 lines={10}>{this.props.rules}</CardParagraph2>
                    <Button
                        view = "primary"
                        size = "s"
                        style={{"marginTop": "10px"}}
                        scaleOnInteraction={true}
                        outlined={false}
                        onClick={this.clickClose}
                    >Закрыть
                    </Button>
                </CardContent>
                </CardBody>
            </Card>
        </div>
        )
    }
}