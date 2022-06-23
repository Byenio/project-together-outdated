import React from 'react';
import './Account.css';
import { getCookie } from '../../scripts/tsx/getCookie';
import { UserPosts } from './UserPosts/UserPosts';

export interface IAccountProps {}

export const Account: React.FunctionComponent<IAccountProps> = (props) => {

    const userProps = {
        id: Number(getCookie('user["id"]')),
        key: getCookie('user["email"]'),
        password: getCookie('user["password"]')
    }

    return (
        
        <div className="Account">
            <h2>Zarządzanie kontem</h2>
            <UserPosts user = { userProps } />
        </div>

    );

}