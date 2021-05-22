import React from 'react'
import { Button } from '@sberdevices/plasma-ui'
import { IconPause, IconPlay, IconClose, IconRefresh, IconClock } from '@sberdevices/plasma-icons'
import "./Controllers.css"

export class Controllers extends React.Component {

    updatePauseButton = () => {
        if(this.props.existPauseRequest)
            return <IconPlay size="l"/>
        else return <IconPause size="l"/>
    }

    clickPause = () => {
        this.props.pauseRequest();
    }

    clickRestart = () => {
        this.props.restart();
    }

    clickClose = () => {
        this.props.exit();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.existPauseRequest !== nextProps.existPauseRequest) {
            this.updatePauseButton();
        }
        return true;
    }
    render() {   
        return (
            <div>
                <div className="controllers-container">
                    <Button
                        style={{"marginRight": "20px"}}
                        size="l"
                        view="primary"
                        pin="circle-circle"
                        contentLeft={this.updatePauseButton()}
                        onClick={this.clickPause} />
                    <Button 
                        size="l"    
                        view="warning"
                        pin="circle-circle"
                        contentLeft={<IconRefresh size="l"/>}
                        onClick={this.clickRestart}/>
                    <Button
                        style={{"marginLeft": "20px"}}
                        size="l"
                        view="critical"
                        pin="circle-circle"
                        contentLeft={<IconClose size="l"/>}
                        onClick={this.clickClose}/>
                </div>
                <div className="item-clock">
                    {this.props.isPause ? <div/> : this.props.existPauseRequest ? <IconClock/> : <div/>}
                    <div className="hide-block" style={{"marginRight": "20px"}}/>
                    <div className="hide-block"/>
                    <div className="hide-block" style={{"marginLeft": "20px"}}/>
                </div>
            </div>
        )
    }
}