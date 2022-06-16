import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export interface INavbarProps {};

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
    return (
        <div className="Navbar">
            <div className="Navbar-logo-container">
                <img src={require("../../images/logo.png")} alt="Logo" className="Navbar-logo-image" />
            </div>
            <div className="Navbar-menu-container">
                <ul className="Navbar-menu-list">
                    <Link to="/">
                        <li className="Navbar-menu-item">Home</li>
                    </Link>
                    <Link to="/posts">
                        <li className="Navbar-menu-item">Posts</li>
                    </Link>
                    <Link to="/about">
                        <li className="Navbar-menu-item">About</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;