import { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

import "./NavPanel.scss";

type NavState = {
  bg: string | undefined;
};

export class NavPanel extends Component<{}, NavState> {
  listenScrollEvent = () => {
    if (window.scrollY < window.innerHeight) {
      this.setState({ bg: undefined });
    } else {
      this.setState({ bg: "dark" });
    }
  };

  componentWillMount() {
    this.setState({ bg: undefined });
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
          variant="pills"
          navbarScroll
          style={{ textTransform: "capitalize" }}
        >
          {[
            "about",
            "experience",
            "education",
            "projects",
            "skills",
            "blog",
            "contact"
          ].map(
            (hash: string): JSX.Element =>
              (<Nav.Link href={`/#${hash}`}>{hash}</Nav.Link>))}
        </Nav>
      </Navbar>
    );
  }
}
