import React from "react";
import Title from "./Title_cmp/Title";
import StatContainer from "./StatContainer_cmp/StatContainer";
import { Controllers } from "./Controllers_cmp/Controllers";
import { Button } from "@sberdevices/plasma-ui";
import "./Statistic.css"

export default class Statistic extends React.Component {
    endGame = () => {
        this.props.endGame();
    }
    assistantSay = () => {
        this.props.assistantSay();
    }
    helpClick = () => {
        this.props.help();
    }
    render() {
        return (
        <div>
            <Title 
                assistant={this.props.character}
                nickname={this.props.nickname}
            />
            <StatContainer 
                сount={this.props.count} 
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
            <Controllers 
                restart={this.props.restart} 
                assistant={this.props.assistant} 
                pauseRequest={this.props.pauseRequest}
                existPauseRequest={this.props.existPauseRequest}
                isPause={this.props.isPause}
                exit={this.props.exit}
            />
            <div className="help-btn">
                <Button
                    view="primary"
                    size="s"
                    disabled={!this.props.isPause ? true : false}
                    onClick={this.helpClick}
                >
                Помощь
                </Button>
            </div>
        </div>
        );
    }
}
