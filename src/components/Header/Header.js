import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../../assets/logos/logo3.svg"
import "./Header.scss"

export default function Header() {
    const [activePage, setActivePage] = useState('dashboard');
    const location = useLocation();

    const handleDashboardClick = () => {
        setActivePage('dashboard');
    }
    
    const handleAlertsClick = () => {
        setActivePage('alerts');
    }

    const handleSettingsClick = () => {
        setActivePage('settings');
    }
    
    useEffect(() => {
        if (location.pathname.includes("/dashboard")) {
            setActivePage('dashboard');
        } else if (location.pathname.includes("/alerts")) {
            setActivePage('alerts');
        } else if (location.pathname.includes("/settings")) {
            setActivePage('settings');
        }
    }, [location.pathname]);

    return (
        <header className='header'>
            <nav className='nav-bar'>
                <section className='nav-bar__image-container'>
                    <Link to="/">
                        <img
                            className='nav-bar__image'
                            src={logo}
                            alt="WeatherCap Logo"
                            onClick={handleDashboardClick}
                        />
                    </Link>
                </section>
                <section className='nav-bar__button-container'>
                    <div className='nav-bar__button-left'>
                        <Link to="/">
                            <button
                                className={`nav-bar__button-dashboard ${activePage === 'dashboard' ? 'nav-bar__button-dashboard--active' : ''}`}
                                type="button"
                                onClick={handleDashboardClick}
                            >
                                Dashboard
                            </button>
                        </Link>
                    </div>
                    <div className='nav-bar__button-right'>
                        <Link to="/alerts">
                            <button
                                className={`nav-bar__button-alerts ${activePage === 'alerts' ? 'nav-bar__button-alerts--active' : ''}`}
                                type="button"
                                onClick={handleAlertsClick}
                            >
                                Alerts
                            </button>
                        </Link>
                    </div>
                    <div className='nav-bar__button-right'>
                        <Link to="/settings">
                            <button
                                className={`nav-bar__button-settings ${activePage === 'settings' ? 'nav-bar__button-settings--active' : ''}`}
                                type="button"
                                onClick={handleSettingsClick}
                            >
                                Settings
                            </button>
                        </Link>
                    </div>
                </section>
            </nav>
        </header>
    )
}