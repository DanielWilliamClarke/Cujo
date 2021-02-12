import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./App";

import 'bootstrap/dist/css/bootstrap.min.css';

import { CV } from "./model/CV";

axios.get("/api/v1/cv").then((res: { data: CV }): void => {
  ReactDOM.render(
    <React.StrictMode>
      <App cv={res.data} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
