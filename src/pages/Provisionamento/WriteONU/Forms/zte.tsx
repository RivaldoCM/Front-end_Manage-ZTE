import { cleanUpModelName, typePppoeZte } from '../../../../config/typesOnus';
import { useAuthOnu } from '../../../../hooks/useAuthOnu';

import { InputContainer } from '../../../../styles/globalStyles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IOnu } from '../../../../interfaces/IOnus';
import { useLoading } from '../../../../hooks/useLoading';
import { useError } from '../../../../hooks/useError';
import { isAlphaNumeric, isValidCpf } from '../../../../config/regex';

export function ZTEForm({ onu }: IOnu){
    const { authOnu, setAuthOnu, onus } = useAuthOnu();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { error, errorMessage, severityStatus, handleError } = useError();

    console.log(onu)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAuthOnu({
            ...authOnu,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(isLoading){
            handleError('warning/has-action-in-progress');
        }else if(!authOnu.cpf.match(isValidCpf)){
            handleError('warning/invalid-cpf-input');
        }else if(typePppoeZte.includes(onu.model) && !authOnu.wifiName.match(isAlphaNumeric)){
            handleError('info/wifi-ssid-did-not-match');
        }else if(typePppoeZte.includes(onu.model) && !authOnu.wifiPassword.match(isAlphaNumeric)){
            handleError('info/wifi-password-did-not-match');
        }else if(typePppoeZte.includes(onu.model) && authOnu.wifiPassword.length < 8){
            handleError('info/wrong-type-passoword');
        }else{
            console.log(authOnu)
        }
    };

    const handleRenderAddicionalConfig = () => {
        const onuModel = cleanUpModelName(onu.model);
    
        switch(onuModel){
            case 'F680':
            case 'F670L':
            case 'F6600':
            case 'F6600P':
                return(
                    <>
                        <InputContainer>
                            <div className="text">
                                <p>Senha PPPoE: </p>
                            </div>
                            <div className="content">
                                <TextField
                                    required
                                    variant="standard"
                                    name='pppoePassword'
                                    value={authOnu.pppoePassword}
                                    onChange={(e) => handleChange(e)}
                                >
                                </TextField>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Nome do Wifi:</p>
                            </div>
                            <div className="content">
                                <TextField
                                    required
                                    variant="standard"
                                    name='wifiName'
                                    value={authOnu.wifiName}
                                    onChange={(e) => handleChange(e)}
                                >
                                </TextField>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Senha do Wifi:</p>
                            </div>
                            <div className="content">
                                <TextField
                                    required
                                    variant="standard"
                                    name='wifiPassword'
                                    value={authOnu.wifiPassword}
                                    onChange={(e) => handleChange(e)}
                                >
                                </TextField>
                            </div>
                        </InputContainer>
                    </>
                )
            default:
            break;
        }
    };

    return(
        <form onSubmit={handleSubmit} className="flex">
            <InputContainer>
                <div className="text">
                    <p>CPF do Cliente: </p>
                </div>
                <div className="content">
                    <TextField
                        required
                        variant="standard"
                        name='cpf'
                        value={authOnu.cpf}
                        onChange={(e) => handleChange(e)}
                    >
                    </TextField>
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    <p>PPPoE do cliente: </p>
                </div>
                <div className="content">
                    <TextField
                        required
                        variant="standard" 
                        name='pppoeUser'
                        value={authOnu.pppoeUser}
                        onChange={(e) => handleChange(e)}
                    >
                    </TextField>
                </div>
            </InputContainer>
            {
                handleRenderAddicionalConfig()
            }
            <div className="flex">
                <Button
                    type="submit" 
                    variant="outlined" 
                    endIcon={<AddOutlinedIcon />}
                >
                    Provisionar
                </Button>
            </div>
        </form>
    )   
}