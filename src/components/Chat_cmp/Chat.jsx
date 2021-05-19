import React from "react";
import Message from "./Message_cmp/Message";
import checker from "../../service/WordChecker";
import { TextField, ActionButton } from "@sberdevices/plasma-ui";
import { IconMessage } from "@sberdevices/plasma-icons";
import "./Chat.css";
import { sendName } from "../../service/API_helper";

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

  async componentDidUpdate() {
    if (clicked) await this.updateScroll();
    clicked = await false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.restarted !== nextProps.restarted) {
      console.log("restart from chat");
      this.setState({
        textName: "",
        lastSayPlayer: false,
        assistantSaing: false,
        nameForAssistant: "",
        isPause: false,
      });
      return false;
    }
    if (nextProps.assistantSay) {
      this.assistantSayName(this.state.nameForAssistant);
      nextProps.assistantSaied();
      return false;
    }
    if (this.props.newname !== nextProps.newname) {
      this.sayName(nextProps.newname);
      clicked = true;
      return true;
    }
    if (this.props.isPause !== nextProps.isPause) return true;
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
  sayName = async (msg) => {
    if (!this.props.isPause) {
      if (!this.state.lastSayPlayer) {
        msg = await this.toNameFormat(msg); //перевод введенной строки в формат имени
        let temp = await this.props.messages; 
        let res = await checker(msg, temp); //проверка на синтаксическую корректность введенного имени
        if (res === 0) {
          let nameFromBackend = await sendName( 
            this.props.userId,
            msg
          );
          switch (nameFromBackend.data) {
            case "1": //сказанного игроком имени нет в бд 
              res = 5;
              console.log(`res = 5`);
              break;
            case "0": //нет имени для ассистента
              res = 6;
              break;
            default: //пришло какое-то имя для ассистента
              break;
          }
          if (res !== 5) {
            await temp.push({ name: msg, from: "from-me" });
            await this.setState({
              textName: this.tfRef.current.value,
              lastSayPlayer: true,
              nameForAssistant: nameFromBackend.data,
            });
            await this.props.allowPause(true);
            await this.props.updateCount(true);
            let timeAnswer = 0;
            if(res === 6) timeAnswer = 1;
            await this.createAssistantSayTime(timeAnswer);
            return;
          }
        }
        if (res > 0 && res < 6) {
          await this.props.assistant.sendData({
            action: {
              action_id: res,
            },
          });
          return;
        } else {
          await this.props.assistant.sendData({
            action: {
              action_id: "firstSym",
              parameters: { sym: res.toUpperCase() },
            },
          });
        }
      } else if (!this.state.assistantSaing) {
        await this.assistantSayName(this.state.nameForAssistant);
      }
      await this.updateScroll();
    }
  };

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  };

  createAssistantSayTime = (time) => {
    let timeReply = this.getRandomInt(0, 102);
    if(time !== 0) {
      timeReply = 101;
    }
    if (timeReply > 100 || this.state.nameForAssistant === "") {
      timeReply = -1;
    } else {
      timeReply = 10 + (timeReply % 10);
    }
    console.log(timeReply);
    this.props.setAssistantSayTime(timeReply);
    this.setState({
      assistantSaing: true,
    });
  };

  assistantSayName = (name) => {
    if (name !== "" && name !== "1" && name !== "0") {
      clicked = true;
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
    }
  };

  click = () => {
    this.tfRef.current.value = "";
    if (!this.props.isPause) {
      this.sayName(this.state.textName);
      clicked = true;
    }
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
    let disabled = this.props.isPause ? true : false;
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
          disabled={disabled}
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
              disabled={disabled}
              onClick={this.click}
              contentRight={<IconMessage />}
            />
          }
        />
      </div>
    );
  }
}
