import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    if (userItems.permissionLevel === 1) {

        return (
        
            <>
    
                <Link to="/account">
                    Posty uzytkownika
                </Link>
    
                <Link to="/account/new-post">
                    Nowy post
                </Link>
    
                <Link to="/account/settings">
                    Ustawienia konta
                </Link>
    
            </>
    
        );

    }

    return (

        <>
    
                <Link to="/account/settings">
                    Ustawienia konta
                </Link>
    
        </>

    )

    

}

export default AccountNav;