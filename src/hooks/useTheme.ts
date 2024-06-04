import { useContext } from 'react';
import { ThemesContext } from '../contexts/ThemesContext';

export const useThemes = () => {
    const context = useContext(ThemesContext);
    if (!context) {
        throw new Error("useThemes must be used within a ThemesContextProvider");
    }
    return context;
};
