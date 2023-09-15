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
            case 'warning/equipament-not-found':
                setErrorMessage('ONU não encontrada.');
            break;
            case 'error/connection-issue':
                setErrorMessage('Não foi possível acessar a OLT.');
            break;
            case 'error/internal-issue':
                setErrorMessage('Erro interno, verifique com o suporte.');
            break;
        }
    };
    return { error, errorMessage, handleError };
};