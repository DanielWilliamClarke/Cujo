import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import "./index.scss";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-vertical-timeline-component/style.min.css";

import { CV } from "./model/CVModel";
import { BlogService } from "./components/blog/BlogService";

axios.get("/api/cv").then((response: AxiosResponse) => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App
          cv={response.data as CV} 
          service={new BlogService()} />
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
