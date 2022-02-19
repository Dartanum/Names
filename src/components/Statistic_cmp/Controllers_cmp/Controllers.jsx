import React from 'react'
import { Button } from '@sberdevices/plasma-ui'
import { IconPause, IconPlay, IconClose, IconRefresh, IconClock } from '@sberdevices/plasma-icons'
import "./Controllers.css"

export class Controllers extends React.Component {

    updatePauseButton = isPhone => {
        if(this.props.existPauseRequest)
            return <IconPlay size={isPhone ? "s" : "l"}/>
        else return <IconPause size={isPhone ? "s" : "l"}/>
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
      const isPhone = this.props.isPhone;

        return (
            <div>
                <div className={isPhone ? "controllers-container-mobile" : "controllers-container"}>
                    <Button
                        style={isPhone ? {width: '40px', height: '40px', marginLeft: "10px"} : {marginRight: "20px"}}
                        size="l"
                        view="primary"
                        pin="circle-circle"
                        contentLeft={this.updatePauseButton(isPhone)}
                        onClick={this.clickPause} />
                    <Button 
                        style={isPhone ? {width: '40px', height: '40px', marginLeft: "10px"} : {}}
                        size="l"    
                        view="warning"
                        pin="circle-circle"
                        contentLeft={<IconRefresh size={isPhone ? "s" : "l"}/>}
                        onClick={this.clickRestart}/>
                    <Button
                        style={isPhone ? {width: '40px', height: '40px', marginLeft: "10px"} : {marginLeft: "20px"}}
                        size="l"
                        view="critical"
                        pin="circle-circle"
                        contentLeft={<IconClose size={isPhone ? "s" : "l"}/>}
                        onClick={this.clickClose}/>
                </div>
                {!this.props.isPhone &&
                <div className="item-clock">
                    {this.props.isPause ? <div/> : this.props.existPauseRequest ? <IconClock/> : <div/>}
                    <div className="hide-block" style={{marginRight: "20px"}}/>
                    <div className="hide-block"/>
                    <div className="hide-block" style={{marginLeft: "20px"}}/>
                </div>}
            </div>
        )
    }
}