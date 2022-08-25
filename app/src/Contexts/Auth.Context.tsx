import React, { useState, PropsWithChildren, useEffect } from 'react';

interface AuthContextInterface {
    accessToken: string;
    refreshToken: string;
    userData: {
        email: string;
        permissionLevel: number;
    }
    updateTokens?: () => void;
}

const AuthContext = React.createContext<Partial<AuthContextInterface>>({});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [ auth, setAuth ] = useState({
        accessToken: String(localStorage.getItem('accessToken')),
        refreshToken: String(localStorage.getItem('refreshToken')),
        userData: {
            email: '',
            permissionLevel: 0
        }
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {

        var myHeaders = new Headers();
        myHeaders.append('authorization', `Bearer ${ auth.accessToken }`);
        myHeaders.append('x-refresh', `Bearer ${ auth.refreshToken }`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        }

        const userData = await fetch(
            `http://localhost:1337/api/user-private`,
            requestOptions
        )

        const newAccessToken = (userData.headers.get('x-access-token'));

        if (newAccessToken) {
            setAuth({
                accessToken: newAccessToken,
                refreshToken: auth.refreshToken,
                userData: {
                    email: auth.userData.email,
                    permissionLevel: auth.userData.permissionLevel
                }
            })
            localStorage.setItem('accessToken', newAccessToken)
        }

        const user = await userData.json();
        const update = {
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            userData: {
                email: user.email,
                permissionLevel: user.permissionLevel
            }
        }

        setAuth(update);

    }

    return (
        <AuthContext.Provider
            value={{
                accessToken: auth.accessToken,
                refreshToken: auth.refreshToken,
                userData: {
                    email: auth.userData.email,
                    permissionLevel: auth.userData.permissionLevel
                },
                updateTokens: () => {}
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}