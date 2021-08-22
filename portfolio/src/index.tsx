import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import "./index.scss";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-vertical-timeline-component/style.min.css";

import { CV } from "./model/CVModel";
import { BlogService } from "./components/blog/BlogService";

(async () => {
  const cvData = (await axios.get("/api/cv")).data as CV;
  const blogService = await new BlogService().fetch();

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App cv={cvData} service={blogService} />
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
