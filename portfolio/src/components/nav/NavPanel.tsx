import { resolve } from "inversify-react";
import { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import { IIconService } from "../../services/IconService";

import "./NavPanel.scss";

type NavState = {
  bg: string | undefined;
  menu: string[];
};

class NavPanel extends Component<RouteComponentProps, NavState> {
  @resolve("IconService") private readonly iconService!: IIconService;

  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      bg: undefined,
      menu: ["home"].concat(this.buildMenuItems()).concat(["blog", "contact"]),
    };

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
        <Nav justify navbarScroll style={{ textTransform: "capitalize" }}>
          <Scrollspy
            items={this.state.menu}
            currentClassName="active"
            offset={-100}
            componentTag="nav"
          >
            {this.state.menu.map((link: string): JSX.Element => {
              const href =
                link !== "home"
                  ? `${this.props.location.pathname}#${link}`
                  : `/#${link}`;
              const NavIcon = this.iconService.getWithDefault(link);
              return (
                <Nav.Link href={href}>
                  <NavIcon />
                  <div>{link}</div>
                </Nav.Link>
              );
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
    this.setState({
      bg: window.scrollY < window.innerHeight ? undefined : "dark",
    });
  };
}

export default withRouter(NavPanel);
