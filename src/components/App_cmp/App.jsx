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
import { findNickName, sendNickName, clearRequest } from "../../service/API_helper";
import { toNameFormat } from "../../service/WordChecker";

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
let userId = "default";

export class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor")
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
      assistantSayTime: -1, //на какой секунде ассистент должен сказать имя
      assistantSay: false, //true, если сейчас ход ассистента
      nickname: "Player", //никней пользователя
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
    this.assistant.on("start", (event) => {
      this.assistant.sendData({
        action: {
          action_id: "addNickname",
        },
      });
      console.log(`assistant.on(start)`, event);
      setTimeout(this.assistant.sendData({action: {action_id: "getSub",}}), 300);
    });

    this.assistant.on("data", (event) => {
      switch (event.type) {
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
  //Получение/отправка никнейма в бэкенд
  async dispatchAssistantAction(action) {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "get_sub":
          userId = action.data;
          let { data } = await findNickName(userId);
          this.setState({nickname: data});
          break;
        case "add_nickname":
          let newNick = await toNameFormat(action.data);
          console.log("Игровое имя: " + newNick);
          if (newNick.length < 15) {
            console.log("Correct nick");
            await sendNickName(userId, newNick);
            this.setState({ nickname: newNick });
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
          await this.pause();
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
    this.setState({
      isEndGame: true,
      isPause: true,
    });
    this.assistant.sendData({
      action: {
        action_id: this.state.playerWin ? "assistantLose" : "assistantWin",
      },
    });
    await clearRequest(userId);
  };

  restart = async () => {
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
    await clearRequest(userId);
  };

  exit = async () => {
    await clearRequest(userId);
    this.assistant.close();
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
              character={this.state.character}
              isWin={this.state.playerWin}
              isEndGame={this.state.isEndGame}
              exit={this.exit}
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
            userId={userId}
          />
          <div className="statistic-container">
            <Statistic
              character={this.state.character}
              count={this.state.nameCount}
              endGame={this.endGame}
              restart={this.restart}
              pause={this.pause}
              exit={this.exit}
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
