import classNames from 'classnames';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useState, useMemo, useEffect } from 'react';
// import { magic } from '../lib/magic';
// import { UserContext } from '../lib/UserContext';
// import { CallToAction, TextButton } from '@magiclabs/ui';
import {
  HistoryIcon,
  CollapsIcon,
  PortfolioIcon,
  LogoIcon,
  LogoutIcon,
  AccountIcon,
  BorrowIcon,
} from './icons';
import { Tooltip } from './Tooltip';
import useDarkMode from '../pages/useDarkMode';
import ConnectButton from './ConnectButton';
import projectConfig from '../config/projectConfig';
import { injected } from '../utils/wallet/connectors';
import { useWeb3React } from '@web3-react/core';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import NFTs from './NFT';

const menuItems = [
  {
    id: 1,
    label: 'NFTs (Whitelisting)',
    icon: PortfolioIcon,
    link: '/',
    onpress: '',
  },
  // { id: 2, label: 'Borrow', icon: BorrowIcon, link: '/Borrow', onpress: '' },
  // { id: 3, label: 'History', icon: HistoryIcon, link: '', onpress: '' },
  // {
  //   id: 2,
  //   label: 'User APP',
  //   icon: AccountIcon,
  //   link: '/profile',
  //   onpress: '',
  // },
  // {
  //   id: 3,
  //   label: 'Token',
  //   icon: AccountIcon,
  //   link: '/Borrow',
  //   onpress: '',
  // },
  // {
  //   id: 3,
  //   label: 'NFT',
  //   icon: AccountIcon,
  //   link: '/NFT',
  //   onpress: '',
  // },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  // const [user, setUser] = useContext(UserContext);
  const [colorTheme, setTheme] = useDarkMode();
  const { activate, setError, account, active } = useWeb3React();

  useEffect(() => {
    async function loadInjectedWallet() {
      const isAuthorized = await injected.isAuthorized();
      if (isAuthorized) {
        await activate(injected);
      }
    }
    try {
      loadInjectedWallet();
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  }, [activate, setError]);

  const logout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      Router.push('/login');
    });
  };

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    'h-screen px-4 pt-8 pb-4 bg-dark_sidebar flex justify-between flex-col dark:bg-dark_sidebar',
    {
      ['w-[220px]']: !toggleCollapse,
      ['w-20']: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    'p-2 rounded-full border border-light bg-white absolute -right-8 top-8 dark:bg-dark_toggle_btn',
    {
      'rotate-180': toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      'flex items-center cursor-pointer  rounded w-full overflow-hidden whitespace-nowrap ',
      {
        ['bg-transparent']: activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <>
      <div
        className={wrapperClasses}
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOver}
        style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center pl-1 gap-2">
              <LogoIcon />
              <span
                className={classNames(
                  'mt-2 font-normal font-titans_fw_400 text-white text-titans_molecule_text',
                  {
                    hidden: toggleCollapse,
                  }
                )}
              >
                Molecule
              </span>
            </div>
            {isCollapsible && (
              <button
                className={collapseIconClasses}
                onClick={handleSidebarToggle}
              >
                <CollapsIcon />
              </button>
            )}
          </div>

          <div className="flex flex-col items-start mt-24 ">
            {active && account ? (
              <>
                {menuItems.map(({ icon: Icon, ...menu }) => {
                  const classes = getNavItemClasses(menu);
                  return (
                    <Tooltip tooltipText={menu.label}>
                      <div className={classes}>
                        <Link key={menu.id} href={menu.link}>
                          <a
                            data-accordion-target="#accordion-collapse-body-3"
                            className="flex py-4 px-3 items-center w-full h-full mt-7 bg-gradient-to-r from-[#fd4e0500] to-[#fd4e054d] "
                            onPress={menu.onpress}
                          >
                            <div style={{ width: '2.6rem' }}>
                              <Icon />
                            </div>
                            {!toggleCollapse && (
                              <>
                                <span
                                  className={classNames(
                                    'text-titans_card_button  font-normal font-titans_fw_500 text-sidebar_text '
                                  )}
                                  onPress={menu.onpress}
                                >
                                  {menu.label}
                                </span>
                              </>
                            )}
                            {/* <div style={{ width: '0.25rem' }}>
                              <img src="sidebar-bar.svg" />
                            </div> */}
                          </a>
                        </Link>
                      </div>
                    </Tooltip>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>

        {active && account ? (
          <span className="flex items-center space-x-2 p-2 bg-gradient-to-r from-[#fd4e054d] to-sidebar_text rounded-full text-white cursor-pointer">
            <Jazzicon
              diameter={32}
              seed={jsNumberForAddress(account.toLowerCase())}
            />
            <span>
              {`${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`}
            </span>
          </span>
        ) : (
          <>
            <ConnectButton />
          </>
        )}

        {/* <div className={`${getNavItemClasses({})} px-4 py-4`} onPress={logout}>
          <div style={{ width: '2.2rem' }}>
            <a>
              <TextButton color="warning" onPress={logout}>
                <LogoutIcon />
              </TextButton>
            </a>
          </div>
          {!toggleCollapse && (
            <a>
              <TextButton color="warning" onPress={logout}>
                Logout
              </TextButton>
            </a>
          )}
        </div> */}

        {/* <div className={`${getNavItemClasses({})} px-4 py-4`}>
          <div style={{ width: '2.2rem' }}>
            {colorTheme === 'light' ? (
              <>
                <svg
                  onClick={() => setTheme('light')}
                  width="34"
                  height="35"
                  viewBox="0 0 56 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.611938"
                    y="1.43359"
                    width="52"
                    height="52"
                    rx="7.5"
                    fill="#E1A346"
                  />
                  <rect
                    x="0.611938"
                    y="1.43359"
                    width="52"
                    height="52"
                    rx="7.5"
                    stroke="#E1A346"
                  />
                  <path
                    d="M26.6119 34.4336C30.4779 34.4336 33.6119 31.2996 33.6119 27.4336C33.6119 23.5676 30.4779 20.4336 26.6119 20.4336C22.7459 20.4336 19.6119 23.5676 19.6119 27.4336C19.6119 31.2996 22.7459 34.4336 26.6119 34.4336Z"
                    fill="#242424"
                  />
                  <path
                    d="M26.6119 38.3936C26.0619 38.3936 25.6119 37.9836 25.6119 37.4336V37.3536C25.6119 36.8036 26.0619 36.3536 26.6119 36.3536C27.1619 36.3536 27.6119 36.8036 27.6119 37.3536C27.6119 37.9036 27.1619 38.3936 26.6119 38.3936ZM33.7519 35.5736C33.4919 35.5736 33.2419 35.4736 33.0419 35.2836L32.9119 35.1536C32.5219 34.7636 32.5219 34.1336 32.9119 33.7436C33.3019 33.3536 33.9319 33.3536 34.3219 33.7436L34.4519 33.8736C34.8419 34.2636 34.8419 34.8936 34.4519 35.2836C34.2619 35.4736 34.0119 35.5736 33.7519 35.5736ZM19.4719 35.5736C19.2119 35.5736 18.9619 35.4736 18.7619 35.2836C18.3719 34.8936 18.3719 34.2636 18.7619 33.8736L18.8919 33.7436C19.2819 33.3536 19.9119 33.3536 20.3019 33.7436C20.6919 34.1336 20.6919 34.7636 20.3019 35.1536L20.1719 35.2836C19.9819 35.4736 19.7219 35.5736 19.4719 35.5736ZM36.6119 28.4336H36.5319C35.9819 28.4336 35.5319 27.9836 35.5319 27.4336C35.5319 26.8836 35.9819 26.4336 36.5319 26.4336C37.0819 26.4336 37.5719 26.8836 37.5719 27.4336C37.5719 27.9836 37.1619 28.4336 36.6119 28.4336ZM16.6919 28.4336H16.6119C16.0619 28.4336 15.6119 27.9836 15.6119 27.4336C15.6119 26.8836 16.0619 26.4336 16.6119 26.4336C17.1619 26.4336 17.6519 26.8836 17.6519 27.4336C17.6519 27.9836 17.2419 28.4336 16.6919 28.4336ZM33.6219 21.4236C33.3619 21.4236 33.1119 21.3236 32.9119 21.1336C32.5219 20.7436 32.5219 20.1136 32.9119 19.7236L33.0419 19.5936C33.4319 19.2036 34.0619 19.2036 34.4519 19.5936C34.8419 19.9836 34.8419 20.6136 34.4519 21.0036L34.3219 21.1336C34.1319 21.3236 33.8819 21.4236 33.6219 21.4236ZM19.6019 21.4236C19.3419 21.4236 19.0919 21.3236 18.8919 21.1336L18.7619 20.9936C18.3719 20.6036 18.3719 19.9736 18.7619 19.5836C19.1519 19.1936 19.7819 19.1936 20.1719 19.5836L20.3019 19.7136C20.6919 20.1036 20.6919 20.7336 20.3019 21.1236C20.1119 21.3236 19.8519 21.4236 19.6019 21.4236ZM26.6119 18.4736C26.0619 18.4736 25.6119 18.0636 25.6119 17.5136V17.4336C25.6119 16.8836 26.0619 16.4336 26.6119 16.4336C27.1619 16.4336 27.6119 16.8836 27.6119 17.4336C27.6119 17.9836 27.1619 18.4736 26.6119 18.4736Z"
                    fill="#242424"
                  />
                </svg>
              </>
            ) : (
              <svg
                onClick={() => setTheme('dark')}
                width="34"
                height="35"
                viewBox="0 0 56 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.611816"
                  y="1.48584"
                  width="52"
                  height="52"
                  rx="7.5"
                  stroke="#E1A346"
                  stroke-opacity="0.38"
                />
                <path
                  d="M36.1418 31.416C35.9818 31.146 35.5318 30.726 34.4118 30.926C33.7918 31.036 33.1618 31.086 32.5318 31.056C30.2018 30.956 28.0918 29.886 26.6218 28.236C25.3218 26.786 24.5218 24.896 24.5118 22.856C24.5118 21.716 24.7318 20.616 25.1818 19.576C25.6218 18.566 25.3118 18.036 25.0918 17.816C24.8618 17.586 24.3218 17.266 23.2618 17.706C19.1718 19.426 16.6418 23.526 16.9418 27.916C17.2418 32.046 20.1418 35.576 23.9818 36.906C24.9018 37.226 25.8718 37.416 26.8718 37.456C27.0318 37.466 27.1918 37.476 27.3518 37.476C30.7018 37.476 33.8418 35.896 35.8218 33.206C36.4918 32.276 36.3118 31.686 36.1418 31.416Z"
                  fill="#E1A346"
                />
              </svg>
            )}
          </div>
          {!toggleCollapse && colorTheme === 'light' ? (
            <a className="text-white">Light Mode</a>
          ) : (
            <a className="text-white">Dark Mode</a>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
