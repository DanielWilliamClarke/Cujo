import { Component } from "react";

import logo from "./logo.svg";
import headshot from "./assets/headshot.jpg"

import "./App.css";

import { CV } from "./CVModel";

type AppProps = {
  cv: CV;
};

class App extends Component<AppProps> {
  render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.props.cv.basics.name}</p>
          <p>{this.props.cv.basics.label}</p>
          <p>{this.props.cv.basics.email}</p>
          <img src={headshot}/> 
        </header>
      </div>
    );
  }
}

export default App;
