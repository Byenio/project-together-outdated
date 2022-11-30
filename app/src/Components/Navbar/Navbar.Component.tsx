import React from 'react';
import { Link } from 'react-router-dom';
import 'Components/Navbar/navbar.css';
import Navlist from 'Components/Navbar/Components/Navbar.List';
import NavMobile from 'Components/Navbar/Components/Navbar.Mobile';


export interface NavbarInterface { };

const Navbar: React.FunctionComponent<NavbarInterface> = (props) => {

    return (

        <div className="navbar md:px-8 px-2">

            <div className="navbar-logo-container">
                <Link to="/">
                    <img src={require("../../img/logo192.png")} alt="ZSTI logo" className="navbar-logo-image" />
                </Link>
            </div>

            <Navlist />
            <NavMobile />
        </div>

    );

}

export default Navbar;