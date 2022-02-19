import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { App } from "./components/App_cmp/App";
import reportWebVitals from "./reportWebVitals";
//import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device';
//import { GlobalStyle } from './GlobalStyle'; 

ReactDOM.render(
        <App />,
  document.getElementById("root")
);
reportWebVitals();
