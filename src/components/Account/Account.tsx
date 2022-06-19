import React from 'react';
import './Account.css';

export interface IAccount {}

export const Account: React.FunctionComponent<IAccount> = (props) => {
    return (
        <h1>Twoje konto</h1>
    );
};