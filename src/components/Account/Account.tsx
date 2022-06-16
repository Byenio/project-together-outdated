import React from 'react';
import './Account.css';

export interface IAccount {}

const MyAccount: React.FunctionComponent<IAccount> = (props) => {
    return (
        <h1>Twoje konto</h1>
    );
};

export default MyAccount;