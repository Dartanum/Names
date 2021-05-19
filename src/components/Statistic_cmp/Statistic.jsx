import React from "react";
import Title from "./Title_cmp/Title";
import StatContainer from "./StatContainer_cmp/StatContainer";
import { Controllers } from "./Controllers_cmp/Controllers";

export default class Statistic extends React.Component {
    endGame = () => {
        this.props.endGame();
    }
    assistantSay = () => {
        this.props.assistantSay();
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
            />
            <Controllers 
                restart={this.props.restart} 
                assistant={this.props.assistant} 
                allowPause={this.props.allowPause}
                pause={this.props.pause}
                isPause={this.props.isPause}
                exit={this.props.exit}
            />
        </div>
        );
    }
}
