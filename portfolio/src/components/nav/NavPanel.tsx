import { useInjection } from "inversify-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import { IIconService } from "../../services/IconService";

import "./NavPanel.scss";

export const NavPanel: React.FC = (): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  const [bg, setBg] = useState<string | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setBg(window.scrollY < window.innerHeight ? undefined : "dark");
    });
  })

  const buildMenuItems = useCallback((): string[] => {
    return location.pathname === "/"
      ? ["about", "experience", "education", "skills", "projects"]
      : ["post"];
  }, [location]);

  const menu = useMemo(() => (["home"]
    .concat(buildMenuItems())
    .concat(["blog", "cv", "profiles"])), 
    [buildMenuItems]);

  return (
      <Navbar
        bg={bg}
        sticky="top"
        variant="dark"
        className="justify-content-center"
      >
        <Nav justify navbarScroll style={{ textTransform: "capitalize" }}>
          <Scrollspy
            items={menu}
            currentClassName="active"
            offset={-100}
            componentTag="nav"
          >
            {menu.map((link: string): JSX.Element => {
              const href =
                link !== "home"
                  ? `${location.pathname}#${link}`
                  : `/#${link}`;
              const NavIcon = iconService.getWithDefault(link);
              return (
                <Nav.Link href={href}>
                  <NavIcon />
                  <div className="nav-label">{link}</div>
                </Nav.Link>
              );
            })}
          </Scrollspy>
        </Nav>
      </Navbar>
    );
};
