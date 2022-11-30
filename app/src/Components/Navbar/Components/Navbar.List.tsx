import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { loggedInNavbarItems, loggedOutNavbarItems } from 'Components/Navbar/Components/Navbar.Items';
import { AuthContext } from 'Contexts/Auth.Context';

export interface NavlistInterface { };

const Navlist: React.FunctionComponent<NavlistInterface> = (props) => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const Logout = () => {

        auth.authenticated = false;
        auth.refreshToken = null;
        auth.accessToken = null;
        auth.userData = {
            email: '',
            permissionLevel: {
                level: 0
            }
        }

        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');

        navigate('/log');

    }

    var list = [];

    if (!auth.authenticated) {
        list = loggedOutNavbarItems;
    } else {
        list = loggedInNavbarItems;
    }

    return (

        <div className='hidden md:flex navbar-menu-container justify-end items-center'>

            <ul className='navbar-menu-list text-white'>
                {list.map((menu, index) => {
                    if (menu.icon && menu.url) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <Link className="flex items-center gap-1 font-medium" to={menu.url} key={index}>{icon}{menu.title}</Link>
                        )
                    } else if (menu.url) {
                        return (
                            <Link className="flex items-center gap-1 font-medium" to={menu.url} key={index}>{menu.title}</Link>
                        )
                    } else if (menu.for === 'logout' && menu.icon) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <li className="flex items-center gap-1 font-medium" key={index} onClick={Logout} >{icon}{menu.title}</li>
                        )
                    }
                })}
            </ul>

        </div>

    )

}

export default Navlist;