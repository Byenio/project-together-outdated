import React from "react";

import AccountNav from './AccountNav';

export interface AccountInterface {};

const Account: React.FunctionComponent<AccountInterface> = (props) => {

    return (
        <>

            <AccountNav />

        </>
    );

}

export default Account;