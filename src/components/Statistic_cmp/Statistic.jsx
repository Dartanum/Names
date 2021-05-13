import React from "react";
import Title from "./Title_cmp/TItle";
import StatContainer from "./StatContainer_cmp/StatContainer";

export default function Statistic(props) {
    return (
        <div>
        <Title />
        <StatContainer сount={props.count} />
        </div>
    );
}
