import { useContext } from 'react';

import { ResponseContext } from '../contexts/handleResponseContext';

export function useResponse(){
    const context = useContext(ResponseContext);
    if (!context) {
      throw new Error("useResponse must be used within an AuthContextProvider");
    }
    return context;
}