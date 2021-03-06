import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

import './styles.css';
import App from "./containers/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
