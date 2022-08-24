import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Account.Nav.Style.css';

export interface AccountNavInterface {};

const AccountNav: React.FunctionComponent<AccountNavInterface> = (props) => {
    
    const tokens = {
        accessToken: String(localStorage.getItem('accessToken')),
        refreshToken: String(localStorage.getItem('refreshToken')),
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const [ userItems, setUserItems ] = useState<any[any]>([]);

    const fetchItems = async () => {

        var myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${ tokens.accessToken }`);
        myHeaders.append("x-refresh", `Bearer ${ tokens.refreshToken }`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        const user = await fetch(
            `http://localhost:1337/api/user-private`,
            requestOptions
        );

        const newAccessToken = (user.headers.get('x-access-token'));

        if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
        }

        const userItems = await user.json();
        setUserItems(userItems);

    }

    if (userItems.permissionLevel === 2) {

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

    if (userItems.permissionLevel === 1) {

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