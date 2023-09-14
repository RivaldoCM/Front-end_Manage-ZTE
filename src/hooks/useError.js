import { useEffect, useState } from "react";

export function useError(){
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setError(false);
        }, 5000);
    }, [error]);
    
    const handleError = (err) => {
        setError(true);

        switch(err){
            case 'loading/has-action-in-progress':
                setErrorMessage('Aguarde a ultima ação ser finalizada.');
            break;
            case 'api/ONU-not-found':
                setErrorMessage('ONU não encontrada.');
            break;
        }
    };
    return { error, errorMessage, handleError };
};