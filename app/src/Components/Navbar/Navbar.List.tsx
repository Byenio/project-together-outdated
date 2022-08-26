import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { loggedInNavbarItems, loggedOutNavbarItems } from './Navbar.Items';
import { AuthContext } from '../../Contexts/Auth.Context';

export interface NavlistInterface {};

const Navlist: React.FunctionComponent<NavlistInterface> = (props) => {

    const auth = useContext(AuthContext);

    var list = [];

    if (!auth.authenticated) {
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