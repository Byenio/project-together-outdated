import React from 'react';
import { Link } from 'react-router-dom';
import 'Components/Account/AccountNav/Account.Nav.Style.css';
import { AccountNavlist } from 'Components/Account/AccountNav/Components/Account.Nav.List';

export interface AccountNavInterface { };

const AccountNav: React.FunctionComponent<AccountNavInterface> = (props) => {

    return (

        <div className="account-nav">

            <AccountNavlist />

        </div>

    );

}

export default AccountNav;