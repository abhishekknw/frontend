import React from 'react';

import Logo from './img/logo.png';

import './index.css';

export default function Header({ sidebarToggle }) {
  const onMenuClick = event => {
    event.preventDefault();

    sidebarToggle();
  };

  return (
    <header className="header header__fixed">
      <div className="container">
        <div className="header__content">
          <a className="header__brand">
            <img src={Logo} alt="Machadalo" />
          </a>
          <div className="header__links">
            <ul>
              <li>
                <a href="" onClick={onMenuClick}>
                  <i className="fa fa-bars" />
                  Menu
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
