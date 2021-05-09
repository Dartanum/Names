import React from "react";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
import "./App.css";
import Chat from "../Chat_cmp/Chat";
import messages from "../../service/messages";

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

let newName = "";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: messages,
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });
    this.assistant.on("data", (event) => {
      console.log(`assistant.on(data)`, event);
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

  dispatchAssistantAction(action) {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "add_name":
          newName = action.data;
          this.setState({messages: this.state.messages})
          break;
        default:
          throw new Error();
      }
    }
  }

  render() {
    return (
      <div className="main-container">
        <Chat newname={newName}/>
        <div className="statistic-container"></div>
      </div>
    );
  }
}
