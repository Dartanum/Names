import React from "react";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
import { createGlobalStyle } from 'styled-components';
import { darkJoy, darkEva, darkSber } from '@sberdevices/plasma-tokens/themes'; 
import {text, background, gradient} from '@sberdevices/plasma-tokens';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device';
import "./App.css";
import Chat from "../Chat_cmp/Chat";
import Statistic from "../Statistic_cmp/Statistic";
import { EndGame } from "../EndGame_cmp/EndGame"
import axios from 'axios';

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
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });
    this.assistant.on("data", (event) => {
      if(event.type === 'character') {
            this.setState({
              messages: this.state.messages,
              nameCount: this.state.nameCount,
              character: event.character.id, 
              isEndGame: this.state.isEndGame,
              restarted: this.state.restarted, 
              timerUpdate: this.state.timerUpdate,
            });
      }
      const { action } = event;
      this.dispatchAssistantAction(action);
    });
  }

  getStateForAssistant() {
    console.log("getStateForAssistant: this.state:", this.state);
    const state = {
      item_selector: {
        items: this.state.messages.map(({ name, from }, index) => ({
          name,
          from,
        })),
      },
    };
    console.log("getStateForAssistant: state:", state);
    return state;
  }

  send = (url) => {
    axios.get(url).then(res => 
      res.data !== null 
      ? this.sayName(res.data) 
      : alert("Такого имени нет"));
  }

  dispatchAssistantAction(action) {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "add_name":
          newName = action.data;
          console.log(`newName: ${newName}`);
          this.setState(this.state)
          break;
        default:
          throw new Error();
      }
    }
  }

  updateCount = () => {
    this.setState({
      messages: this.state.messages,
      nameCount: this.state.nameCount + 1,
      character: this.state.character,
      isEndGame: this.state.isEndGame,
      restarted: this.state.restarted, 
      timerUpdate: !this.state.timerUpdate,
    })
    console.log(`count name: ${this.state.nameCount}`)
  }

  endGame = () => {
    this.setState({
      messages: this.state.messages,
      nameCount: this.state.nameCount,
      character: this.state.character,
      isEndGame: true,
      restarted: this.state.restarted, 
      timerUpdate: this.state.timerUpdate,
    })
  }

  restart = () => {
    this.setState({
      messages: [], 
      nameCount: 0, 
      character: this.state.character, 
      isEndGame: false,
      restarted: !this.state.restarted,
      timerUpdate: !this.state.timerUpdate, 
    })
  }

  render() {
    return (
      <DeviceThemeProvider>
        <DocStyle/>
        {(() => {
                  switch (this.state.character) {
                      case 'sber':
                          return <ThemeBackgroundSber />;
                      case 'eva':
                          return <ThemeBackgroundEva />;
                      case 'joy':
                          return <ThemeBackgroundJoy />;
                      default:
                          return; 
                  }
                }
          )()
        }
        <div className="fill-container" style={{"display": this.state.isEndGame ? "flex" : "none"}}>
          {this.state.isEndGame ? <EndGame count={this.state.nameCount} restart={this.restart}/> : <div/>}
        </div>
        <div className="main-container" >
          <Chat 
            newname={newName}
            updateCount={this.updateCount} 
            assistant={this.assistant} 
            messages={this.state.messages} 
            restart={this.restart}
          />
          <div className="statistic-container">
            <Statistic 
              count={this.state.nameCount} 
              endGame={this.endGame} 
              restart={this.restart} 
              update={this.state.timerUpdate}
            />
          </div>
        </div>
      </DeviceThemeProvider>
    );
  }
}

