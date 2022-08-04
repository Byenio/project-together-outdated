import React from 'react';
import { Link } from 'react-router-dom';

export interface AccountNavInterface {};

const AccountNav: React.FunctionComponent<AccountNavInterface> = (props) => {

    return (
        
        <>

            <Link to="/account">
                Posty uzytkownika
            </Link>

            <Link to="/account/new-post">
                Nowy post
            </Link>

            <Link to="/account/add-tutor">
                Dodaj pomagajacego
            </Link>

            <Link to="/account/settings">
                Ustawienia konta
            </Link>

        </>

    );

}

export default AccountNav;