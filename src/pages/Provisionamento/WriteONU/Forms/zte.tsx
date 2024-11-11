import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoading } from '../../../../hooks/useLoading';
import { useAuth } from '../../../../hooks/useAuth';
import { useAuthOnu } from '../../../../hooks/useAuthOnu';
import { useResponse } from '../../../../hooks/useResponse';

import { isAlphaNumeric, isValidCpf } from '../../../../config/regex';
import { cleanUpModelName, typePppoeZte } from '../../../../config/typesOnus';
import { verifyOnuType } from '../../../../config/verifyOnuType';

import { writeONU } from '../../../../services/apiManageONU/writeOnu';
import { getPeopleId } from '../../../../services/apiVoalle/getPeopleId';
import { getConnectionId } from '../../../../services/apiManageONU/getConnectionId';
import { updateConnection } from '../../../../services/apiVoalle/updateConnection';
import { updateLogsOnu } from '../../../../services/apiManageONU/updateLogOnu';

import { IOnu } from '../../../../interfaces/IOnus';

import { InputContainer } from '../../../../styles/globalStyles';
import { SIP } from '../../style';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import DialerSipOutlinedIcon from '@mui/icons-material/DialerSipOutlined';

export function ZTEForm({onu}: IOnu){
    const navigate = useNavigate();
    const { user } = useAuth();
    const { authOnu, setAuthOnu, setOnus } = useAuthOnu();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { setFetchResponseMessage } = useResponse();

    const [checkedSIP, setCheckedSIP] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAuthOnu({
            ...authOnu,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeSIP = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedSIP(event.target.checked);
    };

    const handleUpdateOltData = () => {
        setAuthOnu((prevAuthOnu) => ({
            ...prevAuthOnu,
            oltId: onu.oltId,
            modelOnu: cleanUpModelName(onu.model),
            onuType: verifyOnuType(onu.serialNumber),
            voalleAccessPointId: onu.voalleId
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
            
            if(peopleId){
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

            const hasAuth = await writeONU({
                userId: user?.uid,
                oltId: authOnu.oltId,
                slot: onu.slot,
                pon: onu.pon,
                serialNumber: onu.serialNumber,
                modelOnu: authOnu.modelOnu,
                contract: connectionData.contractId,
                cpf: authOnu.cpf,
                pppoeUser: authOnu.pppoeUser,
                pppPass: authOnu.pppoePassword,
                wifiSSID: authOnu.wifiName,
                wifiPass: authOnu.wifiPassword,
                sipUser: authOnu.sipUser,
                sipPass: authOnu.sipPass
            });
            stopLoading();

            if(hasAuth){
                if(!hasAuth.success){
                    setFetchResponseMessage(hasAuth.messages.message);
                    setOnus([]);
                    setAuthOnu({
                        ...authOnu,
                        oltId: '',
                        voalleAccessPointId: ''
                    });
                    return;
                } else {
                    setFetchResponseMessage(hasAuth.responses.status!);
                    setOnus([]);
                    setAuthOnu({
                        ...authOnu,
                        oltId: '',
                        cpf: '',
                        pppoeUser: '',
                        pppoePassword: '',
                        wifiName: '',
                        wifiPassword: '',
                        typeOnu: '',
                        modelOnu: 'F601',
                        voalleAccessPointId: ''
                    });
                    setTimeout(() => {
                        navigate('/my_auth_onus');
                    }, 2000);
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
                return;
            }

            const onuId: number = hasAuth.responses.response.onuId;
            if(connectionData.connectionId){
                const response = await updateConnection({
                    onuId: onuId,
                    connectionId: connectionData.connectionId,
                    pppoeUser: authOnu.pppoeUser,
                    pppoePassword: connectionData.password,
                    slot: onu.slot,
                    pon: onu.pon,
                    serialNumber: onu.serialNumber,
                    modelOlt: onu.modelOlt,
                    accessPointId: authOnu.voalleAccessPointId,
                    wifiSSID: authOnu.wifiName,
                    wifiPass: authOnu.wifiPassword
                });
                updateLogsOnu({id: hasAuth.responses.response.logId, isUpdated: response});
            } else {
                updateLogsOnu({id: hasAuth.responses.response.logId, isUpdated: false});
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
                    <React.Fragment>
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
                        <SIP>
                            <div className="sip-header flex">
                                <DialerSipOutlinedIcon color="primary"/>
                                <p>Possui telefone?</p>
                                <Checkbox
                                    checked={checkedSIP}
                                    onChange={handleChangeSIP}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                            {
                                checkedSIP && (
                                    <div className='input-sip'>
                                        <InputContainer>
                                            <div className="text">
                                                <p>Usuário SIP: </p>
                                            </div>
                                            <div className="content">
                                                <TextField
                                                    required
                                                    variant="standard"
                                                    name='sipUser'
                                                    value={authOnu.sipUser}
                                                    onChange={(e) => handleChange(e)}
                                                >
                                                </TextField>
                                            </div>
                                        </InputContainer>
                                        <InputContainer>
                                            <div className="text">
                                                <p>Senha SIP: </p>
                                            </div>
                                            <div className="content">
                                                <TextField
                                                    required
                                                    variant="standard" 
                                                    name='sipPass'
                                                    value={authOnu.sipPass}
                                                    onChange={(e) => handleChange(e)}
                                                >
                                                </TextField>
                                            </div>
                                        </InputContainer>
                                    </div>
                                )
                            }
                        </SIP>
                    </React.Fragment>
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