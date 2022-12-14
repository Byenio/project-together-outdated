import React from 'react';
import { Link } from 'react-router-dom';
import './Account.Nav.Style.css';
import { AccountNavlist } from './Components/Account.Nav.List';

export interface AccountNavInterface { };

const AccountNav: React.FunctionComponent<AccountNavInterface> = (props) => {

    return (

        <div className="account-nav flex-1 max-w-[450px] md:grow-0">

            <AccountNavlist />

        </div>

    );

}

export default AccountNav;