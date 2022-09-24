import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Navlist from './Navbar.List';

export interface NavbarInterface { };

const Navbar: React.FunctionComponent<NavbarInterface> = (props) => {

    return (

        <div className="navbar">

            <div className="navbar-logo-container">
                <Link to="/">
                    <img src={require("../../img/logo192.png")} alt="ZSTI logo" className="navbar-logo-image" />
                </Link>
            </div>

            <Navlist />
        </div>

    );

}

export default Navbar;