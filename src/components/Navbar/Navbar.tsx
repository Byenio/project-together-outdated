import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <div className="Navbar">
            <div className="Navbar-logo-container">
                <img src={require("../../images/logo.png")} alt="Logo" className="Navbar-logo-image" />
            </div>
            <div className="Navbar-menu-container">
                <ul className="Navbar-menu-list">
                    <li className="Navbar-menu-item">Home</li>
                    <li className="Navbar-menu-item">Posts</li>
                    <li className="Navbar-menu-item">About</li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;