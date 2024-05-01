import "./NavBar.scss"
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <NavLink to="/weather" className="navbar__link" activeClassName="navbar__link--active">
                        Weather
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink to="/alerts" className="navbar__link" activeClassName="navbar__link--active">
                        Alerts
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink to="/settings" className="navbar__link" activeClassName="navbar__link--active">
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;