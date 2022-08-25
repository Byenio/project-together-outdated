import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Account.Nav.Style.css';
import { AuthContext } from '../../../Contexts/Auth.Context';

export interface AccountNavInterface {};

const AccountNav: React.FunctionComponent<AccountNavInterface> = (props) => {
    
    const auth = useContext(AuthContext);

    if (auth.userData?.permissionLevel === 2) {

        return (
        
            <div className="account-nav">
    
                <Link to="/account">Posty uzytkownika</Link>
                <Link to="/account/new-post">Nowy post</Link>
                <Link to="/account/tutors">Edytuj pomagajacych</Link>
                <Link to="/account/classes">Edytuj klasy</Link>
                <Link to="/account/subjects">Edytuj przedmioty</Link>
                <Link to="/account/types">Edytuj typy postów</Link>
                <Link to="/account/settings">Ustawienia konta</Link>
    
            </div>
    
        );

    }

    if (auth.userData?.permissionLevel === 1) {

        return (
        
            <div className="account-nav">
    
                <Link to="/account">Posty uzytkownika</Link>
                <Link to="/account/new-post">Nowy post</Link>
                <Link to="/account/settings">Ustawienia konta</Link>
    
            </div>
    
        );

    }

    return (

        <div className="account-nav">
    
            <Link to="/account/settings">Ustawienia konta</Link>
    
        </div>

    )

    

}

export default AccountNav;