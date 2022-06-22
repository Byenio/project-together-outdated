import React from 'react';
import './Account.css';
import { UserPosts } from './UserPosts/UserPosts';

export interface IAccountProps {}

export const Account: React.FunctionComponent<IAccountProps> = (props) => {

    return (
        
        <div className="Account">
            <h2>Twoje konto</h2>
            <UserPosts />
        </div>

    );

};