import React from "react";
import Message from "./Message_cmp/Message";
import checker from "../../service/WordChecker";
import { TextField, ActionButton } from "@sberdevices/plasma-ui";
import { IconMessage } from "@sberdevices/plasma-icons";
import "./Chat.css";

let clicked = false;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.tfRef = React.createRef();
    this.state = {
      textName: "", //текст, введенный в чате
      lastSayPlayer: false, //true, если последнее имя сказал игрок
      assistantSaing: false, //true, если вызван метод assistantSayName
      nameForAssistant: "", //имя, которое должен сказать ассистент
      isPause: false,
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
    if (nextProps.assistantSay) {
      console.log(`assistantSay from chat = ${this.props.assistantSay}`);
      this.assistantSayName(this.state.nameForAssistant);
      nextProps.assistantSaied();
      return false;
    }
    if (this.props.newname !== nextProps.newname) {
      this.sayName(nextProps.newname);
      clicked = true;
      return true;
    }
    if (this.props.messages !== nextProps.messages) return true;
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
    if (!this.props.isPause) {
      if (!this.state.lastSayPlayer) {
        msg = this.toNameFormat(msg);
        let temp = this.props.messages;
        let res = checker(msg, temp);
        if (res === 0) {
          temp.push({ name: msg, from: "from-me" });
          /* Отправить в бэк get запрос со следующим именем */
          let nameFromBackend = temp[temp.length - 1].name;
          nameFromBackend =
            nameFromBackend[nameFromBackend.length - 1].toUpperCase() + "а";
          this.setState({
            textName: this.tfRef.current.value,
            lastSayPlayer: true,
            nameForAssistant: nameFromBackend,
          });
          this.createAssistantSayTime();
          this.props.allowPause(true);
          this.props.updateCount(true);
          return;
        }
        if (res === 1 || res === 2 || res === 3 || res === 4) {
          this.props.assistant.sendData({
            action: {
              action_id: res,
            },
          });
          return;
        } else {
          this.props.assistant.sendData({
            action: {
              action_id: "firstSym",
              parameters: { sym: res.toUpperCase() },
            },
          });
        }
      } else if (!this.state.assistantSaing) {
        this.assistantSayName(this.state.nameForAssistant);
      }
    }
  };

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  };

  createAssistantSayTime = () => {
    let timeReply = this.getRandomInt(0, 102);
    console.log(timeReply); 
    if (timeReply > 100) {
      this.setState({
        lastSayPlayer: false,
        assistantSaing: false,
        nameForAssistant: "",
      });
      this.props.endGame();
      return;
    }
    timeReply = 19 - (timeReply % 10) + 1;
    console.log(timeReply);
    this.props.setAssistantSayTime(timeReply);
    this.setState({
      assistantSaing: true,
    });
  };

  assistantSayName = (name) => {
    console.log("assistantSayName");
    this.props.assistant.sendData({
      action: {
        action_id: "assistantSay",
        parameters: { name: name },
      },
    });
    this.props.messages.push({ name: name, from: "from-them" });
    this.setState({
      lastSayPlayer: false,
      nameForAssistant: "",
      assistantSaing: false,
    });
    this.props.updateCount(false);
    this.props.allowPause(false);
    this.updateScroll();
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
    let messageList = this.props.messages.map((msg, index) => (
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
