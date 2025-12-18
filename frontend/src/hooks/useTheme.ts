import { useState, useEffect } from 'react';

const ThemePreference = () => {
    try {
        if (localStorage.getItem("theme") === "dark" || localStorage.getItem("theme") === "light") {
            return (localStorage.getItem("theme") as "dark" | "light" | "system");
        }
    } catch (e) {
        console.error("Error accessing localStorage:", e);
    }
    return "system";
}


const useTheme = () => {

    const [theme, setThemeState] = useState<"dark" | "light" | "system">(() => ThemePreference());

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.setAttribute('data-theme',"dark");
        } else if (theme === "light") {
            document.documentElement.removeAttribute('data-theme');
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme',"dark");
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }
    }, [theme]);

    const setTheme = (newTheme: "dark" | "light" | "system") => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return { theme, setTheme };
};

export default useTheme;