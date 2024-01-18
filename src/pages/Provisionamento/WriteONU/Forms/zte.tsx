import { useLoading } from '../../../../hooks/useLoading';
import { useError } from '../../../../hooks/useError';
import { useAuthOnu } from '../../../../hooks/useAuthOnu';
import { isAlphaNumeric, isValidCpf } from '../../../../config/regex';
import { cleanUpModelName, typePppoeZte } from '../../../../config/typesOnus';
import { authorizationToOlt } from '../../../../services/apiManageONU/authOnu';
import { IOnu } from '../../../../interfaces/IOnus';

import { InputContainer } from '../../../../styles/globalStyles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import { getPeopleId } from '../../../../services/apiVoalle/getPeopleId';
import { getConnectionId } from '../../../../services/apiManageONU/getConnectionId';
import { updateConnection } from '../../../../services/apiVoalle/updateConnection';



export function ZTEForm({onu}: IOnu){
    const { authOnu, setAuthOnu, onus } = useAuthOnu();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { error, errorMessage, severityStatus, handleError } = useError();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAuthOnu({
            ...authOnu,
            [e.target.name]: e.target.value
        });
    };

    const valueFromIndex = (array: any[]) => {
        if (onu.whichOltIndex >= 0 && onu.whichOltIndex < array.length) {
            const valueInIndex = array[onu.whichOltIndex];
            return valueInIndex;
        } else {
            return undefined;
        }
    }

    const handleUpdateoltData = () => {

        setAuthOnu((prevAuthOnu) => ({
            ...prevAuthOnu,
            ip: [valueFromIndex(authOnu.ip)],
            oltId: [valueFromIndex(authOnu.oltId)],
            onuModel: cleanUpModelName(onu.model),
            isPizzaBox: [valueFromIndex(authOnu.isPizzaBox)],
            voalleAccessPointId: [valueFromIndex(authOnu.voalleAccessPointId)]
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            startLoading();

            const peopleId = await getPeopleId(authOnu.cpf);
            let connectionData = {contractId: 0, connectionId: 0, password: ''}

            if (peopleId){
                connectionData = await getConnectionId(peopleId, authOnu.pppoeUser);
                if (!connectionData.contractId){
                    connectionData.contractId = 0
                }
            }else{
                connectionData.contractId = 0;
            }

            const hasAuth = await authorizationToOlt({
                ip: authOnu.ip,
                slot: onu.slot,
                pon: onu.pon,
                isPizzaBox: authOnu.isPizzaBox,
                serialNumber: onu.serialNumber,
                type: authOnu.onuModel,
                contract: connectionData.contractId,
                pppoeUser: authOnu.pppoeUser,
                pppPass: authOnu.pppoePassword,
                wifiSSID: authOnu.wifiName,
                wifiPass: authOnu.wifiPassword
            });

            if(!hasAuth.success){
                handleError(hasAuth.messages.message);
                return;
            }
            handleError(hasAuth.responses.status!);

            const onuId = hasAuth.responses.response.onuId;

            updateConnection({
                onuId: onuId,
                connectionId: connectionData.connectionId,
                pppoeUser: authOnu.pppoeUser,
                pppoepassword: authOnu.pppoePassword,
                slot: onu.slot,
                pon: onu.pon,
                serialNumber: onu.serialNumber,
                onuType: authOnu.onuType,
                accessPointId: authOnu.voalleAccessPointId,
                wifiSSID: authOnu.wifiName,
                wifiPass: authOnu.wifiPassword

            })

            stopLoading();
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
                    onClick={handleUpdateoltData}
                >
                    Provisionar
                </Button>
            </div>
            {
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
        </form>
    )   
}