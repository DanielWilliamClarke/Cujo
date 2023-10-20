/** @jsxImportSource theme-ui */

import { useInjection } from 'inversify-react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Scrollspy from 'react-scrollspy';
import { event } from "nextjs-google-analytics";
import { getColor } from '@theme-ui/color';

import { IIconService } from '@Services/IconService';

// import { ThemeSetter } from '../theme/ThemeSetter';

import { anton } from '@Common/Font';
import { Theme } from 'theme-ui';

const emitClickEvent = (section: string) => {
  event("dc_user_event", {
    category: "Nav click",
    label: section
  });
};

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
      ? ['about', 'experience', 'education', 'skills', 'projects', 'books']
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
      sx={{
        height: 70,
        padding: 0,
        transition: '0.5s'
      }}
    >
      <Nav
        className={anton.className}
        justify
        navbarScroll
        style={{ textTransform: 'capitalize' }}
      >
        <Scrollspy
          items={menu}
          currentClassName="active"
          offset={-100}
          componentTag="nav"
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItem: 'center',
            alignContact: 'center',

            '@media screen and (max-width: 950px)': {
              flexWrap: 'wrap'
            }
          }}
        >
          {menu.map((link: string): JSX.Element => {
            const href =
              link !== 'home'
                ? `${router.pathname}#${link}`
                : `/#${link}`;
            const NavIcon = iconService.getWithDefault(link);
            return (
              <Nav.Link
                href={href}
                key={href}
                onClick={() => emitClickEvent(link)}
                sx={(t: Theme) => ({
                  display: 'flex',
                  lineHeight: 15,
                  textAlign: 'center',
                  transition: '0.5s',
                  margin: '5px 0',

                  '&.active': {
                    color: `${getColor(t, 'primary')} !important`,
                    fontWieght: 700
                  },
                  '&:hover': {
                    fontWieght: 700
                  },

                  '@media screen and (max-width: 1024px)': {
                    fontSize: 14
                  },
                  '@media screen and (max-width: 950px)': {
                    width: '20%',
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                })}
              >
                <NavIcon
                  sx={{
                    margin: 'auto 0',
                    fontSize: 'calc(20px + 0.25vw)',
                    width: 'calc(20px + 0.25vw)',

                    '@media screen and (max-width: 950px)': {
                      fontSize: 15,
                      width: 20,
                      position: 'relative',
                      top: '-7px'
                    }
                  }}
                />
                <div
                  sx={{
                    margin: 'auto 0',
                    marginLeft: 10,

                    '@media screen and (max-width: 950px)': {
                      display: 'none'
                    }
                  }}
                >
                  {link}
                </div>
              </Nav.Link>
            );
          })}
        </Scrollspy>

        {/* <ThemeSetter /> */}
      </Nav>
    </Navbar>
  );
};
