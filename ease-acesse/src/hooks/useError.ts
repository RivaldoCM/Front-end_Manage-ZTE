import { useEffect, useState } from "react";

import { AlertColor } from "@mui/material";

export function useError(){

    type SeverityStatus = AlertColor;

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>();

    useEffect(() => {
        setTimeout(() => {
            setError(false);
        }, 5000);
    }, [error]);
    
    const handleError = (err: string) => {
        setError(true);

        switch(err){
            case 'warning/has-action-in-progress':
                setErrorMessage('Aguarde a ultima ação ser finalizada.');
                setSeverityStatus('warning');
            break;
            case 'warning/equipament-not-found':
                setErrorMessage('ONU não encontrada, tente novamente.');
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
                setErrorMessage('Digite apenas letras e/ou números.');
                setSeverityStatus('info');
            break;
            case 'info/non-expect-caracter-NAN':
                setErrorMessage('Digite apenas números no campo de contrato.');
                setSeverityStatus('info');
            break;
            case 'info/required-input':
                setErrorMessage('Preencha todos os campos.');
                setSeverityStatus('info');
            break;
            case 'ERR_NETWORK':
                setErrorMessage('Não foi possível se conectar ao serviço.');
                setSeverityStatus('error');
            break;
            case 'info/wrong-type-passoword':
                setErrorMessage('A senha do wifi deve ter no minimo 8 caracteres.');
                setSeverityStatus('info');
            break;
            case 'info/wifi-did-not-match':
                setErrorMessage('O unico caracter especial aceito é o underline.');
                setSeverityStatus('info');
            break;
            default:
                handleError('Erro interno, verifique com o suporte.');
                setSeverityStatus('error');
            break;
        }
    };
    
    return { error, errorMessage, severityStatus, handleError };
};