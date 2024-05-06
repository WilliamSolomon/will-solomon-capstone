import "./NavBar.scss";
import React, { useState } from 'react';

const NavBar = ({ handleNavigation }) => {
    const [activeNavItem, setActiveNavItem] = useState("Weather");

    const handleClick = (navItem) => {
        setActiveNavItem(navItem);
        handleNavigation(navItem);
    };

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <div className={`navbar__link ${activeNavItem === 'Weather' ? 'navbar__link--active' : ''}`} onClick={() => handleClick('Weather')}>
                        Weather
                    </div>
                </li>
                <li className="navbar__item">
                    <div className={`navbar__link ${activeNavItem === 'Alerts' ? 'navbar__link--active' : ''}`} onClick={() => handleClick('Alerts')}>
                        Alerts
                    </div>
                </li>
                <li className="navbar__item">
                    <div className={`navbar__link ${activeNavItem === 'Settings' ? 'navbar__link--active' : ''}`} onClick={() => handleClick('Settings')}>
                        Settings
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
