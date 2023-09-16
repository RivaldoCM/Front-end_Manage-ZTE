import { useEffect, useState } from "react";

export function useError(){
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [severityStatus, setSeverityStatus] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setError(false);
        }, 5000);
    }, [error]);
    
    const handleError = (err) => {
        setError(true);

        switch(err){
            case 'warning/has-action-in-progress':
                setErrorMessage('Aguarde a ultima ação ser finalizada.');
                setSeverityStatus('warning');
            break;
            case 'warning/equipament-not-found':
                setErrorMessage('ONU não encontrada.');
                setSeverityStatus('warning');
            break;
            case 'error/connection-issue':
                setErrorMessage('Não foi possível acessar a OLT.');
                setSeverityStatus('error');
            break;
            case 'error/internal-issue':
                setErrorMessage('Erro interno, verifique com o suporte.');
                setSeverityStatus('error');
            break;
            case 'success/write-data-complete':
                setErrorMessage('ONU Provisionada com sucesso.');
                setSeverityStatus('success');
            break;
            case 'info/non-expect-caracter-not-alphaNumeric':
                setErrorMessage('Digite apenas letras e/ou números');
                setSeverityStatus('info');
            break;
            case 'info/non-expect-caracter-NAN':
                setErrorMessage('Digite apenas números no campo Contrato.');
                setSeverityStatus('info');
            break;
            case 'info/required-input':
                setErrorMessage('Preencha todos os campos.');
                setSeverityStatus('info');
            break;
            default:
                handleError('Erro interno, verifique com o suporte');
            break;
        }
    };
    return { error, errorMessage, severityStatus, handleError };
};