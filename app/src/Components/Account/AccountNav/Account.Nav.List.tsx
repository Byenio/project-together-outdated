import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { accountNavItems_zero, accountNavItems_one, accountNavItems_two, listInterface } from './Account.Nav.Items';
import { AuthContext } from '../../../Contexts/Auth.Context';

export interface AccountNavlistInterface {};

export const AccountNavlist: React.FunctionComponent<AccountNavlistInterface> = () => {

    const auth = useContext(AuthContext);

    var accountNavItems: listInterface[] = [];

    if (auth.userData?.permissionLevel === 2) { accountNavItems = accountNavItems_two }
        else if (auth.userData?.permissionLevel === 1) { accountNavItems = accountNavItems_one }
        else { accountNavItems = accountNavItems_zero; }

    const [ openDropdown, setOpenDropdown ] = useState<boolean>(false);

    const handleDropdownFocus = (state: boolean) => {
        setOpenDropdown(!state);
    }

    return (
        <ul className="account-nav-list">
            { accountNavItems.map((item, index) => {
                if (item.submenu) {
                    return (
                        <li key={ index } className="noselect" onClick={ (e) => handleDropdownFocus(openDropdown) }>{ item.title }
                            <ul className='account-nav-list-sub noselect'>
                                { openDropdown && item.submenu.map((submenuItem, index) => {
                                    return (
                                        <Link key={ index } to={ submenuItem.url } className="account-nav-list-sub-item noselect">
                                            { submenuItem.title }
                                        </Link>
                                    )
                                }) }
                            </ul>
                        </li>
                    )
                }
                return (
                    <Link key={ index } to={ item.url } className="account-nav-list-item">{ item.title }</Link>
                )
            }) }
        </ul>
    )

}