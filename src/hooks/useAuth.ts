import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { IAuthContextProps } from '../interfaces/IAuthContextProps';

export function useAuth(): IAuthContextProps{
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
}