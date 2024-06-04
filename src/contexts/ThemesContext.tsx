import React, { ReactNode, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemesContextType {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemesContext = createContext<ThemesContextType | undefined>(undefined);

export function ThemesContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        document.body.className = theme === "light" ? "light-theme" : "dark-theme";
    }, [theme]);

    return (
        <ThemesContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemesContext.Provider>
    );
}

