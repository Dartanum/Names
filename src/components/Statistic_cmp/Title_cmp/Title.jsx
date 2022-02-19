import React from "react";
import "./Title.css";
import logo_sber from "./images/logo_salut.png";
import logo_user from "./images/logo_user.png";
import vs from "./images/versus.png";

export default class Title extends React.Component {

  render() {
    let newName;
    switch (this.props.assistant) {
      case "sber":
        newName = "Сбер";
        break;
      case "eva":
        newName = "Афина";
        break;
      case "joy":
        newName = "Джой";
        break;
      default:
        newName = "Сбер";
        break;
    }
    const imageClass = this.props.isPhone ? "logo-header-mobile" : "logo-header";
    const isPhone = this.props.isPhone;

    return (
      <div className={isPhone ? "header_container-mobile" : "header_container"}>
        <div className="info-container">
          <img src={logo_sber} className={imageClass} />
          <div className="player-name">{newName}</div>
        </div>
        <div className="info-container">
          <img src={vs} className={imageClass} />
        </div>
        <div className="info-container">
          <img src={logo_user} className={imageClass} />
          <div className="player-name">{this.props.nickname}</div>
        </div>
      </div>
    );
  }
}
