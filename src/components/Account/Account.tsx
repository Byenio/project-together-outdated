import React from 'react';
import './Account.css';
import { AccountNav } from './AccountNav/AccountNav';

export interface IAccountProps {}

export const Account: React.FunctionComponent<IAccountProps> = (props) => {

    return (
        
        <div className="Account">
            <AccountNav />
        </div>

    );

}