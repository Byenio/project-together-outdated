import React from 'react';
import { Link } from 'react-router-dom';
import { loggedInNavbarItems, loggedOutNavbarItems } from './Navbar.Items';

export interface NavlistInterface {};

const Navlist: React.FunctionComponent<NavlistInterface> = (props) => {

    const logged = true;
    var list = null;

    if (!logged) {
        list = loggedOutNavbarItems;
    } else {
        list = loggedInNavbarItems;
    }

    return (

        <div className='navbar-menu-container'>

            <ul className='navbar-menu-list'>
                { list.map((menu, index) => {
                    return (
                        <Link to={menu.url} key={index}>{menu.title}</Link>
                    )
                }) }
            </ul>

        </div>

    )

}

export default Navlist;