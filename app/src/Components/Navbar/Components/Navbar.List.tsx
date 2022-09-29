import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

        navigate('/log');

    }

    var list = [];

    if (!auth.authenticated) {
        list = loggedOutNavbarItems;
    } else {
        list = loggedInNavbarItems;
    }

    return (

        <div className='navbar-menu-container'>

            <ul className='navbar-menu-list'>
                {list.map((menu, index) => {
                    if (menu.icon && menu.url) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <Link to={menu.url} key={index}>{icon}{menu.title}</Link>
                        )
                    } else if (menu.url) {
                        return (
                            <Link to={menu.url} key={index}>{menu.title}</Link>
                        )
                    } else if (menu.for === 'notifications' && menu.icon) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <li key={index}>{icon}{menu.title}</li>
                        )
                    } else if (menu.for === 'logout' && menu.icon) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <li key={index} onClick={Logout} >{icon}{menu.title}</li>
                        )
                    }
                })}
            </ul>

        </div>

    )

}

export default Navlist;