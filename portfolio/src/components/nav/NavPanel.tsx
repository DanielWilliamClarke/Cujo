import { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

import "./NavPanel.scss";

type Locator = {
  root: string;
  hash: string;
};

type NavState = {
  bg: string | undefined;
};

class NavPanel extends Component<RouteComponentProps, NavState> {
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

    const profileNav: Locator[] = [
      { root: "/", hash: "home" },
      { root: "/", hash: "about" },
      { root: "/", hash: "experience" },
      { root: "/", hash: "education" },
      { root: "/", hash: "skills" },
      { root: "/", hash: "projects" }
    ];

    const blogNav: Locator[] = [
      { root: "/", hash: "home" },
      { root: this.props.location.pathname, hash: "post" }
    ];

    const permenantNav = [
      { root: this.props.location.pathname, hash: "blog" },
      { root: this.props.location.pathname, hash: "contact" }
    ]

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
          {(this.props.location.pathname === "/" ? profileNav : blogNav)
            .concat(permenantNav)
            .map(
              ({ root, hash }: Locator): JSX.Element => (
                <Nav.Link href={`${root}#${hash}`}>{hash}</Nav.Link>
              ))}
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(NavPanel);
