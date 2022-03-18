import { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Scrollspy from "react-scrollspy";

import {
  MdHome,
  MdBook,
  MdHistoryEdu,
  MdCampaign,
  MdFingerprint,
  MdLoyalty,
  MdSchool,
  MdBolt,
  MdHardware,
} from "react-icons/md";

import "./NavPanel.scss";

type MenuItem = {
  link: string;
  icon: JSX.Element;
};

type NavState = {
  bg: string | undefined;
  menu: MenuItem[];
};

class NavPanel extends Component<RouteComponentProps, NavState> {
  componentWillMount() {
    this.setState({
      bg: undefined,
      menu: [{ link: "home", icon: <MdHome /> }]
        .concat(this.buildMenuItems())
        .concat([
          { link: "blog", icon: <MdBook /> },
          { link: "contact", icon: <MdCampaign /> },
        ]),
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
        <Nav justify navbarScroll style={{ textTransform: "capitalize" }}>
          <Scrollspy
            items={this.state.menu.map(({ link }) => link)}
            currentClassName="active"
            offset={-100}
            componentTag="nav"
          >
            {this.state.menu.map(({ link, icon }: MenuItem): JSX.Element => {
              const href =
                link !== "home"
                  ? `${this.props.location.pathname}#${link}`
                  : `/#${link}`;
              return (
                <Nav.Link href={href}>
                  {icon}
                  <div>{link}</div>
                </Nav.Link>
              );
            })}
          </Scrollspy>
        </Nav>
      </Navbar>
    );
  }

  private buildMenuItems(): MenuItem[] {
    return this.props.location.pathname === "/"
      ? [
          { link: "about", icon: <MdFingerprint /> },
          { link: "experience", icon: <MdLoyalty /> },
          { link: "education", icon: <MdSchool /> },
          { link: "skills", icon: <MdBolt /> },
          { link: "projects", icon: <MdHardware /> },
        ]
      : [{ link: "post", icon: <MdHistoryEdu /> }];
  }

  private listenScrollEvent = () => {
    this.setState({
      bg: window.scrollY < window.innerHeight ? undefined : "dark",
    });
  };
}

export default withRouter(NavPanel);
