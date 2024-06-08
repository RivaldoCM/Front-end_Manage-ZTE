import { useContext } from 'react';
import { MassiveContext } from '../contexts/MassiveContext';

export function useMassive(){
    const context = useContext(MassiveContext);
    if (!context) {
      throw new Error("useMassive must be used within an MassiveContextProvider");
    }
    return context;
}