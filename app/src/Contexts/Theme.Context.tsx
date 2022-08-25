import React, { useState, PropsWithChildren } from 'react';

interface ThemeContextInterface {
    dark: boolean;
    toggleTheme?: () => void;
}

const defaultState = {
    dark: true
}

const ThemeContext = React.createContext<ThemeContextInterface>(defaultState);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [ dark, setDark ] = useState(defaultState.dark);

    const toggleTheme = () => {
        setDark(!dark);
    }

    return (
        <ThemeContext.Provider
            value={{
                dark,
                toggleTheme
            }}
        >
            { children }
        </ThemeContext.Provider>
    )

}