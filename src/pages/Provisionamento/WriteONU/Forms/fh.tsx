import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { InputContainer } from "../../../../styles/globalStyles";
import { useAuth } from "../../../../hooks/useAuth";
import { useAuthOnu } from "../../../../hooks/useAuthOnu";
import { useLoading } from "../../../../hooks/useLoading";
import { useResponse } from "../../../../hooks/useResponse";
import { useNavigate } from "react-router-dom";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { IOnu } from "../../../../interfaces/IOnus";
import { setCorrectOltValues } from "../../../../config/verifyWhichOltIs";
import { verifyOnuType } from "../../../../config/verifyOnuType";
import { getPeopleId } from "../../../../services/apiVoalle/getPeopleId";
import { getConnectionId } from "../../../../services/apiManageONU/getConnectionId";
import { isValidCpf } from "../../../../config/regex";
import { authorizationToOlt } from "../../../../services/apiManageONU/authOnu";
import { updateConnection } from "../../../../services/apiVoalle/updateConnection";

export function FHForm({onu}: IOnu){
    const navigate = useNavigate();
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
            typeOnu: verifyOnuType(onu.serialNumber),
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
        }else{
            startLoading();
            const peopleId = await getPeopleId(authOnu.cpf);
            let connectionData = {contractId: 0, connectionId: 0, password: ''}
            
            if (peopleId){
                const response = await getConnectionId(authOnu.cpf, peopleId, authOnu.pppoeUser);
                if(response){
                    if (!connectionData.contractId){
                        connectionData.contractId = 0;
                    } else {
                        connectionData.connectionId = response.data.connectionId;
                        connectionData.contractId = response.data.contractId;
                        connectionData.password = response.data.password;
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
                serialNumber: onu.serialNumber,
                modelOnu: authOnu.modelOnu,
                modelOlt: onu.modelOlt,
                typeOnu: authOnu.typeOnu,
                contract: connectionData.contractId,
                pppoeUser: authOnu.pppoeUser,
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
                        cpf: '',
                        pppoeUser: '',
                        pppoePassword: '',
                        wifiName: '',
                        wifiPassword: '',
                        typeOnu: '',
                        modelOnu: 'F601',
                        modelOlt: [],
                        isPizzaBox: [],
                        voalleAccessPointId: []
                    });
                    setTimeout(() => {
                        navigate('/my_auth_onus');
                    }, 2000);
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
                return;
            }

            if(connectionData.connectionId){
                updateConnection({
                    connectionId: connectionData.connectionId,
                    pppoeUser: authOnu.pppoeUser,
                    pppoePassword: connectionData.password,
                    slot: onu.slot,
                    pon: onu.pon,
                    serialNumber: onu.serialNumber,
                    modelOlt: authOnu.modelOlt[0],
                    accessPointId: authOnu.voalleAccessPointId,
                    wifiSSID: authOnu.wifiName,
                    wifiPass: authOnu.wifiPassword
                });
            }
        }
    }

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
                onu.serialNumber.startsWith('ZTEG') ? 
                    <InputContainer>
                        <div className="text">
                            <p>Qual o modelo da ONU: </p>
                        </div>
                        <TextField
                            id='select-city'
                            select
                            label="Modelo"
                            name="modelOnu"
                            onChange={handleChange}
                            value={authOnu.modelOnu}
                        >
                            <MenuItem value={'F601'}>F601</MenuItem>
                            <MenuItem value={'F612'}>F612</MenuItem>
                        </TextField>
                    </InputContainer> 
                : <></>
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
    );
}