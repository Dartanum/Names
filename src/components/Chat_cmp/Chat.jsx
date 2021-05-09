import React from "react";
import Message from "../Message_cmp/Message";
import checker from "../../service/WordChecker";
import { TextField, ActionButton } from "@sberdevices/plasma-ui";
import { IconMessage } from "@sberdevices/plasma-icons";
import "./Chat.css";
import messages from "../../service/messages";

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
    console.log("updateScroll");
    let block = document.getElementById("block");
    block.scrollTop = block.scrollHeight;
  };

  componentDidUpdate() {
    this.updateScroll();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      this.sayName(nextProps.newname);
      return true;
    }
    if (this.state !== nextState) return true;
    return false;
  }

  //добавление вводимого сообщения
  sayName = (msg) => {
    let temp = this.state.messages;
    let fromWho;
    if (temp.length !== 0) {
      fromWho =
        temp[temp.length - 1].from === "from-me" ? "from-them" : "from-me";
    } else fromWho = "from-me";
    if (checker(msg, temp)) {
      temp.push({ name: msg, from: fromWho });
    }
    this.setState({
      messages: temp,
      textName: this.tfRef.current.value,
    });
  };

  click = () => {
    this.tfRef.current.value = "";
    this.sayName(this.state.textName);
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
          contentRight={
            <ActionButton
              size="m"
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
