import { createContext, useState, useEffect, useCallback } from 'react';

// Add more theme options and persist theme in localStorage
const themes = {
    light: {
        name: 'light',
        background: '#fff',
        color: '#222',
    },
    dark: {
        name: 'dark',
        background: '#222',
        color: '#fff',
    },
    blue: {
        name: 'blue',
        background: '#0074D9',
        color: '#fff',
    },
};

export const ThemeContext = createContext({
    theme: themes.light,
    setTheme: () => {},
    toggleTheme: () => {},
    availableThemes: Object.keys(themes),
});

export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        const saved = localStorage.getItem('app-theme');
        return themes[saved] || themes.light;
    };

    const [theme, setThemeState] = useState(getInitialTheme);

    useEffect(() => {
        localStorage.setItem('app-theme', theme.name);
        document.body.style.background = theme.background;
        document.body.style.color = theme.color;
    }, [theme]);

    const setTheme = useCallback((themeName) => {
        if (themes[themeName]) {
            setThemeState(themes[themeName]);
        }
    }, []);

    const toggleTheme = useCallback(() => {
        const themeNames = Object.keys(themes);
        const currentIdx = themeNames.indexOf(theme.name);
        const nextIdx = (currentIdx + 1) % themeNames.length;
        setThemeState(themes[themeNames[nextIdx]]);
    }, [theme.name]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                toggleTheme,
                availableThemes: Object.keys(themes),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};