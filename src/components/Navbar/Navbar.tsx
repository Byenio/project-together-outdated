import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { getCookie } from '../../scripts/tsx/getCookie';

export interface INavbarProps {};

export const Navbar: React.FunctionComponent<INavbarProps> = (props) => {

    if (!getCookie('logged')) {
        return (
            <div className="Navbar">
                <div className="Navbar-logo-container">
                    <Link to="/">
                        <img src={require("../../images/logo.png")} alt="Logo" className="Navbar-logo-image" />
                    </Link>    
                </div>
                <div className="Navbar-menu-container">
                    <ul className="Navbar-menu-list">
                        <Link to="/">
                            <li className="Navbar-menu-item">Home</li>
                        </Link>
                        <Link to="/login">
                            <li className="Navbar-menu-item">Posty</li>
                        </Link>
                        <Link to="/login">
                            <li className="Navbar-menu-item">Logowanie</li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="Navbar">
            <div className="Navbar-logo-container">
                <Link to="/">
                    <img src={require("../../images/logo.png")} alt="Logo" className="Navbar-logo-image" />
                </Link>    
            </div>
            <div className="Navbar-menu-container">
                <ul className="Navbar-menu-list">
                    <Link to="/">
                        <li className="Navbar-menu-item">Home</li>
                    </Link>
                    <Link to="/posts">
                        <li className="Navbar-menu-item">Posty</li>
                    </Link>
                    <Link to="/account">
                        <li className="Navbar-menu-item">Konto</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
    
};