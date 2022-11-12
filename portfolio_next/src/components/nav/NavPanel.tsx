import { useInjection } from 'inversify-react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Scrollspy from 'react-scrollspy';
import { IIconService } from '../../services/IconService';

import { ThemeSetter } from '../theme/ThemeSetter';

export const NavPanel: React.FC = (): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  const [bg, setBg] = useState<string | undefined>(undefined);
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setBg(window.scrollY < window.innerHeight ? undefined : 'dark');
    });
  }, []);

  const buildMenuItems = useCallback((): string[] => {
    return router.pathname === '/'
      ? ['about', 'experience', 'education', 'skills', 'projects']
      : ['post'];
  }, [router]);

  const menu = useMemo(() => (['home']
    .concat(buildMenuItems())
    .concat(['blog', 'cv', 'contact'])),
  [buildMenuItems]);

  return (
      <Navbar
        bg={bg}
        sticky="top"
        variant="dark"
        className="justify-content-center"
      >
        <Nav justify navbarScroll style={{ textTransform: 'capitalize' }}>
          <Scrollspy
            items={menu}
            currentClassName="active"
            offset={-100}
            componentTag="nav"
          >
            {menu.map((link: string): JSX.Element => {
              const href =
                link !== 'home'
                  ? `${router.pathname}#${link}`
                  : `/#${link}`;
              const NavIcon = iconService.getWithDefault(link);
              return (
                <Nav.Link href={href} key={href}>
                  <NavIcon />
                  <div className="nav-label">{link}</div>
                </Nav.Link>
              );
            })}
          </Scrollspy>

          <ThemeSetter/>
        </Nav>
      </Navbar>
  );
};
