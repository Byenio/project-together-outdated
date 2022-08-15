import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export interface NavbarInterface {};

const Navbar: React.FunctionComponent<NavbarInterface> = (props) => {

    return (

        <div className="navbar">

            <div className="navbar-logo-container">
                <Link to="/">
                    <img src={require("../img/logo192.png")} alt="Logo" className="navbar-logo-image" />
                </Link>
            </div>

            <div className="navbar-menu-container">
                <ul className="navbar-menu-list">
                    <Link to="/">
                        <li className="navbar-menu-item">Posty</li>
                    </Link>
                    <Link to="/account">
                        <li className="navbar-menu-item">Konto</li>
                    </Link>
                    <li className="navbar-menu-item">Powiadomienia</li>
                    <Link to="/log">
                        <li className="navbar-menu-item">Logowanie</li>
                    </Link>
                </ul>
            </div>
        </div>

    );

}

export default Navbar;