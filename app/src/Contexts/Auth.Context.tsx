import React, { useState, PropsWithChildren, useEffect } from 'react';

interface AuthContextInterface {
    authenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    userData: {
        email: string;
        permissionLevel: {
            level: number;
        };
    }
    updateTokens?: () => void;
}

export const AuthContext = React.createContext<Partial<AuthContextInterface>>({});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [ auth, setAuth ] = useState({
        authenticated: false,
        accessToken: String(localStorage.getItem('accessToken')),
        refreshToken: String(localStorage.getItem('refreshToken')),
        userData: {
            email: '',
            permissionLevel: {
                level: 0
            }
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
                authenticated: true,
                accessToken: newAccessToken,
                refreshToken: auth.refreshToken,
                userData: {
                    email: auth.userData.email,
                    permissionLevel: {
                        level: auth.userData.permissionLevel.level
                    }
                }
            })
            localStorage.setItem('accessToken', newAccessToken)
        }

        const user = await userData.json();
        const update = {
            authenticated: true,
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            userData: {
                email: user.email,
                permissionLevel: {
                    level: user.permissionLevel.level
                }
            }
        }

        setAuth(update);

    }

    return (
        <AuthContext.Provider
            value={{
                authenticated: auth.authenticated,
                accessToken: auth.accessToken,
                refreshToken: auth.refreshToken,
                userData: {
                    email: auth.userData.email,
                    permissionLevel: {
                        level: auth.userData.permissionLevel.level
                    }
                },
                updateTokens: () => {}
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}