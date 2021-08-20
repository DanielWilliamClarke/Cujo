import { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Scrollspy from 'react-scrollspy';

import { BsLightning } from "react-icons/bs";
import { GiDiceTwentyFacesTwenty } from "react-icons/gi";
import { IoHomeOutline, IoPlanetOutline, IoRocketOutline, IoSchoolOutline, IoCodeWorkingSharp, IoMegaphoneOutline, IoLibraryOutline } from "react-icons/io5";

import "./NavPanel.scss";

type MenuItem = {
  link: string;
  icon: JSX.Element;
}

type NavState = {
  bg: string | undefined;
  menu: MenuItem[];
};

class NavPanel extends Component<RouteComponentProps, NavState> {
  componentWillMount() {
    this.setState({
      bg: undefined,
      menu: [
        { link: "home", icon: <IoHomeOutline /> }
      ].concat(this.buildMenuItems()).concat([
        { link: "blog", icon: <IoLibraryOutline /> },
        { link: "contact", icon: <IoMegaphoneOutline /> }
      ])
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
          <Scrollspy
            items={this.state.menu.map(({ link }) => link)}
            currentClassName="active"
            offset={-100}
            componentTag="nav">
            {this.state.menu.map(
              ({ link, icon }: MenuItem): JSX.Element => {
                const href = link !== "home" ?
                  `${this.props.location.pathname}#${link}` :
                  `/#${link}`;
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
    return this.props.location.pathname === "/" ?
      [
        { link: "about", icon: <GiDiceTwentyFacesTwenty /> },
        { link: "experience", icon: <IoRocketOutline /> },
        { link: "education", icon: <IoSchoolOutline /> },
        { link: "skills", icon: <IoCodeWorkingSharp /> },
        { link: "projects", icon: <BsLightning /> }
      ] :
      [{ link: "post", icon: <IoPlanetOutline /> }];
  }

  private listenScrollEvent = () => {
    this.setState({ bg: window.scrollY < window.innerHeight ? undefined : "dark" });
  };
}

export default withRouter(NavPanel);
