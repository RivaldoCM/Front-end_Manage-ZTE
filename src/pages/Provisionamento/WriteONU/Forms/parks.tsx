import { useNavigate } from "react-router-dom";

import { useAuthOnu } from "../../../../hooks/useAuthOnu";
import { useLoading } from "../../../../hooks/useLoading";
import { useAuth } from "../../../../hooks/useAuth";
import { useResponse } from "../../../../hooks/useResponse";

import { isValidCpf } from "../../../../config/regex";
import { setCorrectOltValues } from "../../../../config/verifyWhichOltIs";
import { verifyOnuType } from "../../../../config/verifyOnuType";

import { getPeopleId } from "../../../../services/apiVoalle/getPeopleId";
import { getConnectionId } from "../../../../services/apiManageONU/getConnectionId";
import { authorizationToOlt } from "../../../../services/apiManageONU/authOnu";
import { updateConnection } from "../../../../services/apiVoalle/updateConnection";

import { IOnu } from "../../../../interfaces/IOnus";

import { InputContainer } from "../../../../styles/globalStyles";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, CircularProgress, TextField } from "@mui/material";


export function PARKSForm({onu}: IOnu){
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
        }else{
            startLoading();
            const peopleId = await getPeopleId(authOnu.cpf);
            let connectionData = {contractId: 0, connectionId: 0, password: ''}

            if (peopleId){
                const response = await getConnectionId(authOnu.cpf, peopleId.id, authOnu.pppoeUser);
                if(response){
                    if(response.success){
                        connectionData.connectionId = response.responses.response.connectionId;
                        connectionData.contractId = response.responses.response.contractId;
                        connectionData.password = response.responses.response.password;
                    } else {
                        connectionData.contractId = 0;
                    }
                } else {
                    connectionData.contractId = 0;
                }
            }else{
                connectionData.contractId = 0;
            }

            const hasAuth = await authorizationToOlt({
                userId: user?.uid,
                cityId: authOnu.cityId,
                oltId: authOnu.oltId[0],
                ip: authOnu.ip,
                pon: onu.pon,
                serialNumber: onu.serialNumber,
                modelOlt: onu.modelOlt,
                contract: connectionData.contractId,
                pppoeUser: authOnu.pppoeUser,
                rxPower: onu.rxPower
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
                        typeOnu: '',
                        modelOnu: '',
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
                    onuId: 0,
                    connectionId: connectionData.connectionId,
                    pppoeUser: authOnu.pppoeUser,
                    pppoePassword: connectionData.password,
                    pon: onu.pon,
                    slot: 1,
                    serialNumber: onu.serialNumber,
                    modelOlt: onu.modelOlt,
                    accessPointId: authOnu.voalleAccessPointId,
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