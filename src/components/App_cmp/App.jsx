import React from "react";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
import { createGlobalStyle } from "styled-components";
import { darkJoy, darkEva, darkSber } from "@sberdevices/plasma-tokens/themes";
import { text, background, gradient } from "@sberdevices/plasma-tokens";
import { DeviceThemeProvider } from "@sberdevices/plasma-ui/components/Device";
import "./App.css";
import Chat from "../Chat_cmp/Chat";
import Statistic from "../Statistic_cmp/Statistic";
import { EndGame } from "../EndGame_cmp/EndGame";
import {findNickName} from "../../service/API_helper"

const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);

const initializeAssistant = (getState) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({ getState });
};

const DocStyle = createGlobalStyle`
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;

let newName = ""; //имя, сказанное голосом ассистенту
let userId = null;

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], //сказанные имена
      nameCount: 0, //количество сказанных имен
      character: "sber", //текущий персонаж
      isEndGame: false, //обновляется, когда игра заканчивается
      restarted: false, //изменяется, когда нужен рестарт игры
      timerUpdate: false, //изменяется когда надо обновить таймер
      playerWin: false, //true, если последнее слово сказано игроком
      isPause: true, //true, если нажата пауза
      pauseAllow: true, //true, если в данный момент можно остановить игру
      assistantSayTime: -1,
      assistantSay: false,
      nickname: "player",
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
    this.assistant.on("start", (event) => {
      /* Запрос ника в бэкенд */
      this.assistant.sendData({
        action: {
          action_id: "addNickname",
        },
      });
      console.log(`assistant.on(start)`, event);
    });
    this.assistant.on("data", (event) => {
      switch (event.type) {
        case "initSub": 
          userId = event.sub;
          // let response = findNickName(userId);
          // console.log(response);
          // if(response === '') {
          //   console.log("there is now available nickname");
          // } else {
          //   this.setState({
          //     nickname: response,
          //   })
          // }
          break;
        case "character":
          if (event.character.id === "eva") newName = "Афина";
          if (event.character.id === "joy") newName = "Джой";
          this.setState({
            character: event.character.id,
          });
          break;
      }
      const { action } = event;
      this.dispatchAssistantAction(action);
    });
  }

  getStateForAssistant() {
    const state = {
      item_selector: {
        items: this.state.messages.map(({ name, from }, index) => ({
          name,
          from,
        })),
      },
    };
    return state;
  }

  dispatchAssistantAction(action) {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "add_nickname":
          let newNick = action.data;
          console.log("Игровое имя: " + newNick);
          if (newNick.length < 15) {
            console.log("Correct nick");
            this.setState({ nickname: action.data });
          } else {
            this.assistant.sendData({
              action: {
                action_id: "repeat",
              },
            });
          }
          break;
        case "add_name":
          newName = action.data;
          this.setState(this.state);
          break;
        case "restart_game":
          this.restart();
          break;
        case "pause_game":
          this.pause();
          break;
        case "continue_game":
          if (this.state.isPause) this.pause();
          break;
        default:
          break;
      }
    }
  }

  updateCount = (isPlayer) => {
    this.setState({
      nameCount: this.state.nameCount + 1,
      timerUpdate: !this.state.timerUpdate,
      playerWin: isPlayer,
    });
  };

  endGame = async () => {
    await this.setState({
      isEndGame: true,
      isPause: true,
    });
    await this.assistant.sendData({
      action: {
        action_id: this.state.playerWin ? "assistantLose" : "assistantWin",
      },
    });
  };

  restart = () => {
    console.log("restart from App");
    newName = "";
    this.setState({
      messages: [],
      nameCount: 0,
      isEndGame: false,
      restarted: !this.state.restarted,
      timerUpdate: !this.state.timerUpdate,
      playerWin: false,
      isPause: false,
      pauseAllow: true,
      assistantSayTime: -1,
      assistantSay: false,
    });
  };

  pause = () => {
    if (this.state.pauseAllow) {
      this.setState({
        isPause: !this.state.isPause,
      });
    }
  };

  allowPause = (verdict) => {
    this.setState({
      pauseAllow: verdict,
    });
  };

  assistantSay = () => {
    this.setState({
      assistantSay: true,
      assistantSayTime: -1,
    });
  };

  assistantSaied = () => {
    this.setState({
      assistantSay: false,
    });
  };
  setAssistantSayTime = (sec) => {
    this.setState({
      assistantSayTime: sec,
    });
  };

  render() {
    return (
      <DeviceThemeProvider>
        <DocStyle />
        {(() => {
          switch (this.state.character) {
            case "sber":
              return <ThemeBackgroundSber />;
            case "eva":
              return <ThemeBackgroundEva />;
            case "joy":
              return <ThemeBackgroundJoy />;
            default:
              return;
          }
        })()}
        <div
          className="fill-container"
          style={{ display: this.state.isEndGame ? "flex" : "none" }}
        >
          {this.state.isEndGame ? (
            <EndGame
              count={this.state.nameCount}
              restart={this.restart}
              assistant={this.assistant}
              isWin={this.state.playerWin}
            />
          ) : (
            <div />
          )}
        </div>
        <div className="main-container">
          <Chat
            newname={newName}
            updateCount={this.updateCount}
            assistant={this.assistant}
            messages={this.state.messages}
            restarted={this.state.restarted}
            isPause={this.state.isPause}
            allowPause={this.allowPause}
            setAssistantSayTime={this.setAssistantSayTime}
            assistantSaied={this.assistantSaied}
            assistantSay={this.state.assistantSay}
          />
          <div className="statistic-container">
            <Statistic
              character={this.state.character}
              count={this.state.nameCount}
              endGame={this.endGame}
              restart={this.restart}
              pause={this.pause}
              isPause={this.state.isPause}
              allowPause={this.state.pauseAllow}
              update={this.state.timerUpdate}
              assistant={this.assistant}
              assistantSayTime={this.state.assistantSayTime}
              assistantSay={this.assistantSay}
              nickname={this.state.nickname}
            />
          </div>
        </div>
      </DeviceThemeProvider>
    );
  }
}
