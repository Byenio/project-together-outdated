import React, { useState, PropsWithChildren, useEffect } from 'react';
import { getAuth } from '../Proxies/getAuth';

export interface AuthContextInterface {
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

const useAuth = () => {

    const [auth, setAuth] = useState({
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
    const [errors, setErrors] = useState(null);

    const fetchAuth = async () => {

        getAuth(auth)
            .then((response) => {
                setAuth(response);
            })
            .catch((error) => {
                setErrors(error);
            })

    }

    useEffect(() => {
        fetchAuth();
    }, []);

    return { auth, errors };

}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const { auth } = useAuth();

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
                updateTokens: () => { }
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}