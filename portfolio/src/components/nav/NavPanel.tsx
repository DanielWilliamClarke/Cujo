import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import "./NavPanel.scss";
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
            {this.profileNav()}
            <li className="option">
              <NavHashLink activeClassName="Nav-active" smooth to="/blog#blog">
                Blog
              </NavHashLink>
            </li>
            <li className="option">
              <NavHashLink
                activeClassName="Nav-active"
                smooth
                to="/contact#contact"
              >
                Contact
              </NavHashLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  private profileNav(): JSX.Element {
    return (
      <Fragment>
        {["about", "technical", "experience", "education", "projects"].map(
          (link: string): JSX.Element => {
            return (
              <li className="option">
                <NavHashLink
                  activeClassName="Nav-active"
                  smooth
                  to={`/#${link}`}
                >
                  {link}
                </NavHashLink>
              </li>
            );
          }
        )}
      </Fragment>
    );
  }
}
