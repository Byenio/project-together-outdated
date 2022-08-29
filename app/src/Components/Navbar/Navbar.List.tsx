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
                    if (menu.icon && menu.url) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <Link to={ menu.url } key={ index }>{ icon }{ menu.title }</Link>
                        )
                    } else if (menu.url) {
                        return (
                            <Link to={ menu.url } key={ index }>{ menu.title }</Link>
                        )
                    } else if (menu.for === 'notifications' && menu.icon) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <li key={ index }>{ icon }{ menu.title }</li>
                        )
                    }
                }) }
            </ul>

        </div>

    )

}

export default Navlist;