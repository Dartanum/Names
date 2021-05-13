import React from "react";
import Message from "./Message_cmp/Message";
import checker from "../../service/WordChecker";
import { TextField, ActionButton } from "@sberdevices/plasma-ui";
import { IconMessage } from "@sberdevices/plasma-icons";
import "./Chat.css";
import messages from "../../service/messages";

let clicked = false;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.tfRef = React.createRef();
    this.state = {
      messages: messages,
      textName: "",
    };
  }

  updateScroll = () => {
    let block = document.getElementById("block");
    block.scrollTop = block.scrollHeight;
  };

  componentDidUpdate() {
    if (clicked) this.updateScroll();
    clicked = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.newname !== nextProps.newname) {
      this.sayName(nextProps.newname);
      clicked = true;
      return true;
    }
    if (this.state !== nextState) return true;
    return false;
  }
  toNameFormat = (msg) => {
    if (msg.length !== 0) {
      msg = msg.toLowerCase();
      msg = msg[0].toUpperCase() + msg.slice(1);
    }
    return msg;
  };
  //добавление вводимого сообщения
  sayName = (msg) => {
    msg = this.toNameFormat(msg);
    console.log(msg);
    let temp = this.state.messages;
    let fromWho;
    if (temp.length !== 0) {
      fromWho =
        temp[temp.length - 1].from === "from-me" ? "from-them" : "from-me";
    } else fromWho = "from-me";
    let res = checker(msg, temp);
    if (res === 0) {
      if (msg !== "") {
        temp.push({ name: msg, from: fromWho });
        this.props.updateCount();
      }
      this.setState({
        messages: temp,
        textName: this.tfRef.current.value,
      });
      return;
    }
    if(res === 1 || res === 2 || res === 3 || res === 4) {
      this.props.assistant.sendData({
        action: {
          action_id: res,
        },
      });
      return;
    }
    else {
      this.props.assistant.sendData({
        action: {
          action_id: 'firstSym',
          parameters: {sym: res.toUpperCase()},
        },
      });
    }
  };

  click = () => {
    this.tfRef.current.value = "";
    this.sayName(this.state.textName);
    clicked = true;
  };

  enters = (ev) => {
    if (ev.code === "Enter") {
      this.click();
    }
  };

  render() {
    let messageList = this.state.messages.map((msg, index) => (
      <Message key={index} name={msg.name} from={msg.from} />
    ));
    return (
      <div className="chat">
        <div className="subChat" id="block">
          {messageList}
        </div>
        <TextField
          id="tf"
          ref={this.tfRef}
          value={this.state.textName}
          className="editText"
          label="Введите имя"
          onChange={(v) =>
            this.setState({
              messages: this.state.messages,
              textName: v.target.value,
            })
          }
          onKeyDown={this.enters}
          contentRight={
            <ActionButton
              id="ab"
              size="l"
              view="primary"
              onClick={this.click}
              contentRight={<IconMessage />}
            />
          }
        />
      </div>
    );
  }
}
