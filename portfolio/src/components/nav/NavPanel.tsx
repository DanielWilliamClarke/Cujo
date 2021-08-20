import { Component, Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Scrollspy from 'react-scrollspy';

import "./NavPanel.scss";

type NavState = {
  bg: string | undefined;
  menu: string[];
};

class NavPanel extends Component<RouteComponentProps, NavState> {
  componentWillMount() {
    this.setState({
      bg: undefined,
      menu: ["home"].concat(this.buildMenuItems()).concat(["blog", "contact"]),
    });

    window.addEventListener("scroll", this.listenScrollEvent);
  }

  render(): JSX.Element {
    return (
      <Navbar
        bg={this.state.bg}
        sticky="top"
        variant="dark"
        className="justify-content-center"
      >
        <Nav
          justify
          navbarScroll
          style={{ textTransform: "capitalize" }}
        >
          <Scrollspy items={this.state.menu} currentClassName="active" offset={-100} componentTag="nav">
            {this.state.menu.map(
              (hash: string): JSX.Element => {
                const href = hash !== "home" ? 
                  `${this.props.location.pathname}#${hash}` :
                  `/#${hash}`;
                return <Nav.Link href={href}>{hash}</Nav.Link>
              })}
          </Scrollspy>
        </Nav>
      </Navbar>
    );
  }

  private buildMenuItems(): string[] {
    return this.props.location.pathname === "/"
      ? ["about", "experience", "education", "skills", "projects"]
      : ["post"];
  }

  private listenScrollEvent = () => {
    if (window.scrollY < window.innerHeight) {
      this.setState({ bg: undefined });
    } else {
      this.setState({ bg: "dark" });
    }
  };
}

export default withRouter(NavPanel);
