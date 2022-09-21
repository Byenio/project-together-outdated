import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { accountNavItems_zero, accountNavItems_one, accountNavItems_two, listInterface } from './Account.Nav.Items';
import { AuthContext } from '../../../Contexts/Auth.Context';

import { FaDiscord } from '../../../Icons/React.Icons';

export interface AccountNavlistInterface {};

export const AccountNavlist: React.FunctionComponent<AccountNavlistInterface> = () => {

    const auth = useContext(AuthContext);

    var accountNavItems: listInterface[] = [];

    if (auth.userData?.permissionLevel.level === 2) { accountNavItems = accountNavItems_two }
        else if (auth.userData?.permissionLevel.level === 1) { accountNavItems = accountNavItems_one }
        else { accountNavItems = accountNavItems_zero; }

    const [ openDropdown, setOpenDropdown ] = useState<boolean>(false);

    const handleDropdownFocus = (state: boolean) => {
        setOpenDropdown(!state);
    }

    return (

        <ul className="account-nav-list">
            { accountNavItems.map((item, index) => {
                const icon = React.createElement(item.icon);
                if (item.submenu) {
                    return (
                        <li key={ index } className="noselect" onClick={ (e) => handleDropdownFocus(openDropdown) }>{ icon }{ item.title }
                            <ul className='account-nav-list-sub noselect'>
                                { openDropdown && item.submenu.map((submenuItem, index) => {
                                    const icon = React.createElement(submenuItem.icon);
                                    return (
                                        <Link key={ index } to={ submenuItem.url } className="account-nav-list-sub-item noselect">
                                            { icon }{ submenuItem.title }
                                        </Link>
                                    )
                                }) }
                            </ul>
                        </li>
                    )
                }
                return (
                    <Link key={ index } to={ item.url } className="account-nav-list-item">{ icon }{ item.title }</Link>
                )
            }) }
            <a href='https://discord.gg/HvYR5H6jMP'target="_blank" rel="noreferrer"><FaDiscord/>Zgłoś błędy/propozycje</a>
        </ul>
        
    )

}