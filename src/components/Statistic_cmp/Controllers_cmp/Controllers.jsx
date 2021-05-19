import React from 'react'
import { Button } from '@sberdevices/plasma-ui'
import { IconPause, IconPlay, IconClose, IconRefresh } from '@sberdevices/plasma-icons'
import "./Controllers.css"

export class Controllers extends React.Component {

    updatePauseButton = () => {
        if(this.props.isPause)
            return <IconPlay size="l"/>
        else return <IconPause size="l"/>
    }

    clickPause = () => {
        if(this.props.allowPause) {
            this.props.pause();
        }
    }

    clickRestart = () => {
        this.props.restart();
    }

    clickClose = () => {
        this.props.exit();
    }

    render() {
        return (
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
        )
    }
}