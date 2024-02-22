import { useLoading } from '../../../../hooks/useLoading';
import { useAuth } from '../../../../hooks/useAuth';
import { useAuthOnu } from '../../../../hooks/useAuthOnu';
import { isAlphaNumeric, isValidCpf } from '../../../../config/regex';
import { cleanUpModelName, typePppoeZte } from '../../../../config/typesOnus';
import { verifyOnuType } from '../../../../config/verifyOnuType';
import { authorizationToOlt } from '../../../../services/apiManageONU/authOnu';
import { getPeopleId } from '../../../../services/apiVoalle/getPeopleId';
import { getConnectionId } from '../../../../services/apiManageONU/getConnectionId';
import { updateConnection } from '../../../../services/apiVoalle/updateConnection';
import { setCorrectOltValues } from '../../../../config/verifyWhichOltIs';
import { IOnu } from '../../../../interfaces/IOnus';

import { InputContainer } from '../../../../styles/globalStyles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useResponse } from '../../../../hooks/useResponse';


export function ZTEForm({onu}: IOnu){
    const { user } = useAuth();
    const { authOnu, setAuthOnu, setOnus } = useAuthOnu();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { setFetchResponseMessage } = useResponse();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAuthOnu({
            ...authOnu,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateOltData = () => {
        setAuthOnu((prevAuthOnu) => ({
            ...prevAuthOnu,
            ip: [setCorrectOltValues(onu, authOnu.ip)],
            oltId: [setCorrectOltValues(onu, authOnu.oltId)],
            onuModel: cleanUpModelName(onu.model),
            onuType: verifyOnuType(onu.serialNumber),
            isPizzaBox: [setCorrectOltValues(onu, authOnu.isPizzaBox)],
            voalleAccessPointId: [setCorrectOltValues(onu, authOnu.voalleAccessPointId)]
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isLoading){
            setFetchResponseMessage('warning/has-action-in-progress');
        }else if(!authOnu.cpf.match(isValidCpf)){
            setFetchResponseMessage('warning/invalid-cpf-input');
        }else if(typePppoeZte.includes(onu.model) && !authOnu.wifiName.match(isAlphaNumeric)){
            setFetchResponseMessage('info/wifi-ssid-did-not-match');
        }else if(typePppoeZte.includes(onu.model) && !authOnu.wifiPassword.match(isAlphaNumeric)){
            setFetchResponseMessage('info/wifi-password-did-not-match');
        }else if(typePppoeZte.includes(onu.model) && authOnu.wifiPassword.length < 8){
            setFetchResponseMessage('info/wrong-type-passoword');
        }else{
            startLoading();
            const peopleId = await getPeopleId(authOnu.cpf);
            let connectionData = {contractId: 0, connectionId: 0, password: ''}
            if (peopleId){
                const response = await getConnectionId(authOnu.cpf, peopleId, authOnu.pppoeUser);
                if(response){
                    if (!connectionData.contractId){
                        connectionData.contractId = 0;
                    }
                }
            }else{
                connectionData.contractId = 0;
            }

            const hasAuth = await authorizationToOlt({
                userId: user?.uid,
                cityId: authOnu.cityId,
                oltId: authOnu.oltId[0],
                ip: authOnu.ip,
                slot: onu.slot,
                pon: onu.pon,
                isPizzaBox: authOnu.isPizzaBox,
                serialNumber: onu.serialNumber,
                type: authOnu.oltType,
                model: authOnu.onuModel,
                contract: connectionData.contractId,
                pppoeUser: authOnu.pppoeUser,
                pppPass: authOnu.pppoePassword,
                wifiSSID: authOnu.wifiName,
                wifiPass: authOnu.wifiPassword
            });
            stopLoading();

            if(hasAuth){
                if(!hasAuth.success){
                    setFetchResponseMessage(hasAuth.messages.message);
                    setOnus([]);
                    setAuthOnu({
                        ...authOnu,
                        ip: [],
                        oltId: [],
                        cityId: 0,
                        isPizzaBox: [],
                        voalleAccessPointId: []
                    });
                    return;
                } else {
                    setFetchResponseMessage(hasAuth.responses.status!);
                    setOnus([]);
                    setAuthOnu({
                        ...authOnu,
                        ip: [],
                        oltId: [],
                        cityId: 0,
                        cpf: '',
                        pppoeUser: '',
                        pppoePassword: '',
                        wifiName: '',
                        wifiPassword: '',
                        onuType: '',
                        onuModel: '',
                        isPizzaBox: [],
                        voalleAccessPointId: []
                    });
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
                return;
            }

            const onuId: number = hasAuth.responses.response.onuId;
            if(connectionData.connectionId){
                updateConnection({
                    onuId: onuId,
                    connectionId: connectionData.connectionId,
                    pppoeUser: authOnu.pppoeUser,
                    pppoePassword: connectionData.password,
                    slot: onu.slot,
                    pon: onu.pon,
                    serialNumber: onu.serialNumber,
                    onuType: authOnu.onuType,
                    accessPointId: authOnu.voalleAccessPointId,
                    wifiSSID: authOnu.wifiName,
                    wifiPass: authOnu.wifiPassword
                });
            }
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
            {
                isLoading ?
                <CircularProgress className="MUI-CircularProgress" color="primary"/>
                :
                <div className="flex">
                    <Button
                        type="submit" 
                        variant="outlined" 
                        endIcon={<AddOutlinedIcon />}
                        onClick={handleUpdateOltData}
                    >
                        Provisionar
                    </Button>
                </div>
            }
        </form>
    )   
}