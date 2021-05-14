import React from "react";
import Title from "./Title_cmp/TItle";
import StatContainer from "./StatContainer_cmp/StatContainer";
import { Controllers } from "./Controllers_cmp/Controllers";

export default class Statistic extends React.Component {
    endGame = () => {
        this.props.endGame();
    }

    render() {
        return (
        <div>
            <Title />
            <StatContainer сount={this.props.count} endGame={this.endGame} update={this.props.update}/>
            <Controllers restart={this.props.restart}/>
        </div>
        );
    }
}
