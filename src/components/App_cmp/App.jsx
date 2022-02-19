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
import { Help } from "../Help_cmp/Help"
import { findNickName, sendNickName, clearRequest } from "../../service/API_helper";
import { toNameFormat } from "../../service/WordChecker";

let rules;
function editRules(style) {
  let offStyle = style === "off" ? "скажите" : "скажи";
  let rules = `Один игрок говорит имя, 
                а другой отвечает ему именем на последнюю букву. На ответ дается 30 секунд, 
                после чего игра заканчивается. Можно сменить свое игровое имя, сказав 
                «Игровое имя» или «Ник». Чтобы перезапустить игру, ${offStyle} «заново» или «сначала». 
                Чтобы приостановить игру, ${offStyle} «пауза». Появится значок часов. Она активируется 
                только если последнее сказанное слово было за игроком. Чтобы начать играть, ${offStyle}
                «начать»`
  return rules;
}
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
let helpCalled = false;
let gameStart = false;
let isPhone = window.matchMedia("(max-width: 768px)").matches;

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
      existPauseRequest: true,
      assistantSayTime: -1, //на какой секунде ассистент должен сказать имя
      assistantSay: false, //true, если сейчас ход ассистента
      nickname: "Игрок", //никней пользователя
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
    this.assistant.on("start", (event) => {
      this.assistant.sendData({
        action: {
          action_id: "newGame",
        },
      });
      rules = editRules("off");
      setTimeout(this.assistant.sendData({action: {action_id: "getSub",}}), 300);
    });

    this.assistant.on("data", (event) => {
      switch (event.type) {
        case "character":
          rules = editRules("off");
          if (event.character.id === "joy") {
            newName = "Джой";
            rules = editRules("unoff");
          }
          if (event.character.id === "eva") newName = "Афина";
          this.setState({
            character: event.character.id,
          });
          break;
        case "close_app":
          clearRequest(userId);
          break;
      }
      const { action } = event;
      this.dispatchAssistantAction(action);
    });
  }
  
  getStateForAssistant() {
    const state = {
      item_selector: {
        items: this.state.isPause, 
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
          console.log(data);
          if(data !== "")
            this.setState({nickname: data});
          break;
        case "add_nickname":
          let newNick = await toNameFormat(action.data);
          if (newNick.length < 15 && newNick.length > 1) {
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
          if(!this.state.isPause && !this.state.isEndGame && !helpCalled )
            this.setState({
              existPauseRequest: !this.state.existPauseRequest,
            });
          break;
        case "continue_game":
          if (this.state.isPause && !this.state.isEndGame && !helpCalled)           
            this.setState({
              existPauseRequest: !this.state.existPauseRequest,
            });
          break;
        case "start_game":
          if(!gameStart && !helpCalled) {
            this.setState({
              existPauseRequest: false
            })
          }
          break;
        case "rules_game":
          if(!helpCalled && !this.state.isEndGame) {
            this.help();
          }
          break;
        case "close_rules":
          if(this.state.isPause && helpCalled) {
            helpCalled = false;
            this.setState(this.state);
          }
          break;
        default:
          break;
      }
    }
  }

  endGame = async () => {
    gameStart = false;
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
    newName = "";
    helpCalled = false;
    gameStart = true;
    this.assistant.sendData({action: {action_id: "btnPause"}})
    if(this.state.isPause) {
      this.pause();
    }
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
      existPauseRequest: false,
    });
    await clearRequest(userId);
  };

  exit = async () => {
    await clearRequest(userId);
    this.assistant.close();
  };

  pause = () => {
    if(!gameStart) gameStart = true;
      if(helpCalled) helpCalled = false;
      if(this.state.isPause) {
        this.assistant.sendData({action: {action_id: "btnPause"}})
      } else this.assistant.sendData({action: {action_id: "btnContinue"}})
      this.setState({
        isPause: !this.state.isPause,
      });
  };

  update = (verdict) => {
    this.setState({
      nameCount: this.state.nameCount + 1,
      timerUpdate: !this.state.timerUpdate,
      playerWin: verdict,
      pauseAllow: verdict,
    });
  };

  help = () => {
    if(this.state.isPause) {
      helpCalled = !helpCalled;
      if(helpCalled) {
        this.assistant.sendData({
          action: {
            action_id: "Help",
            parameters: { rules: rules }
          }
        })
      } else {
        this.assistant.sendData({action: {action_id: "btnRules"}})
      }
    }
    this.setState(this.state);
  }
  pauseRequest = () => {
    this.setState({
      existPauseRequest: !this.state.existPauseRequest
    })
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
        <Help 
          helpCalled={helpCalled}
          isPause={this.state.isPause}
          rules={rules}
          help={this.help}
        />
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
        <div className={isPhone ? "main-container-mobile" : "main-container"}>
          <Chat
            isPhone={isPhone}
            newname={newName}
            update={this.update}
            assistant={this.assistant}
            messages={this.state.messages}
            restarted={this.state.restarted}
            isPause={this.state.isPause}
            setAssistantSayTime={this.setAssistantSayTime}
            assistantSaied={this.assistantSaied}
            assistantSay={this.state.assistantSay}
            userId={userId}
            endGame={this.endGame}
          />
          <div className={isPhone ? "statistic-container-mobile" : "statistic-container"}>
            <Statistic
              isPhone={isPhone}
              character={this.state.character}
              count={this.state.nameCount}
              endGame={this.endGame}
              restart={this.restart}
              pause={this.pause}
              exit={this.exit}
              help={this.help}
              isPause={this.state.isPause}
              allowPause={this.state.pauseAllow}
              pauseRequest={this.pauseRequest}
              update={this.state.timerUpdate}
              assistant={this.assistant}
              assistantSayTime={this.state.assistantSayTime}
              assistantSay={this.assistantSay}
              nickname={this.state.nickname}
              existPauseRequest={this.state.existPauseRequest}
              isWin={this.state.playerWin}
              restarted={this.state.restarted}
              isEndGame={this.state.isEndGame}
              helpCalled={helpCalled}
            />
          </div>
        </div>
      </DeviceThemeProvider>
    );
  }
}
