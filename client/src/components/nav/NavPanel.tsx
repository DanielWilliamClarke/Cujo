import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavPanel.css";
import logo from "../../assets/logo_blue.png";

interface StyleProps {
  style: React.CSSProperties;
}

export class NavPanel extends Component<StyleProps> {
  render(): JSX.Element {
    return (
      <nav style={this.props.style} className="Nav-panel">
        <div className="Nav-container Nav-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="Nav-container Nav-buttons">
          <ul>
            <li className="option">
              <NavLink exact activeClassName="Nav-active" to="/">
                About
              </NavLink>
            </li>
            <li className="option">
              <NavLink exact activeClassName="Nav-active" to="/blog">
                Blog
              </NavLink>
            </li>
            <li className="option">
              <NavLink exact activeClassName="Nav-active" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
