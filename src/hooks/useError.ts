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
            case 'info/wifi-password-did-not-match':
                setErrorMessage('Não são permitidos carcteres especiais na senha.');
                setSeverityStatus('info');
            break;
            case 'info/wrong-type-passoword':
                setErrorMessage('A senha do wifi deve ter no minimo 8 caracteres.');
                setSeverityStatus('info');
            break;
            case 'info/wifi-ssid-did-not-match':
                setErrorMessage('O único caracter especial permitido no nome do wifi é o underline(_).');
                setSeverityStatus('info');
            break;
            case 'success/user-updated':
                setErrorMessage('Usuário atualizado com sucesso.');
                setSeverityStatus('success');
            break;
            case 'success/user-created':
                setErrorMessage('Usuário criado com sucesso.');
                setSeverityStatus('success');
            break;
            case 'error/already-exists-email':
                setErrorMessage('Este email já existe na base de dados.');
                setSeverityStatus('error');
            break;
            case 'Invalid Token':
                setErrorMessage('Usuário não autenticado, você precisa fazer login novamente.');
                setSeverityStatus('error');
            break;
            case 'Invalid Secret':
                setErrorMessage('Erro interno, verifique com o suporte.');
                setSeverityStatus('error');
            break;
            case 'Invalid Email':
                setErrorMessage('Este Email não existe em nossa base de dados.');
                setSeverityStatus('error');
            break;
            case 'Invalid Password':
                setErrorMessage('A senha está incorreta, verifique novamente.');
                setSeverityStatus('error');
            break;
            case 'warning/invalid-cpf-input':
                setErrorMessage('CPF ou CNPJ inválidos.');
                setSeverityStatus('warning');
            break;
            case 'unable-load-data':
                setErrorMessage('Não foi possível carregar os dados, tente fazer login novamente.');
                setSeverityStatus('error');
            break;
            case 'success/onu-delete-completed':
                setErrorMessage('ONU desprovisionada com sucesso.');
                setSeverityStatus('success');
            break;
            case 'success/olt-deleted':
                setErrorMessage('OLT deletada com sucesso.');
                setSeverityStatus('success');
            break;
            case 'success/new-olt-created':
                setErrorMessage('OLT criada com sucesso.');
                setSeverityStatus('success');
            break;
            case 'success/olt-edited':
                setErrorMessage('OLT editada com sucesso.');
                setSeverityStatus('success');
            break;
            case 'error/impossible-to-create-new-data':
                setErrorMessage('Não foi possivel criar uma nova OLT.');
                setSeverityStatus('error');
            break;
            case 'error/no-connection-with-API':
                setErrorMessage('Erro ao conectar a API, verifique com o suporte.');
                setSeverityStatus('error');
            break;
            case 'error/expected-date':
                setErrorMessage('Você precisa informar a data nos filtros.');
                setSeverityStatus('error');
            break;
            case 'error/lastDate-isBefore-initialDate':
                setErrorMessage('A ultima data não pode ser antes da primeira.');
                setSeverityStatus('error');
            break;
            case 'error/initial-isAfter-lastDate':
                setErrorMessage('A primeira data não pode ser depois da ultima.');
                setSeverityStatus('error');
            break;
            default:
                setErrorMessage('Erro interno, verifique com o suporte.');
                setSeverityStatus('error');
            break;
        }
    };
    return { error, errorMessage, severityStatus, handleError };
};