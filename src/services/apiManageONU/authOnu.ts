import axios from 'axios';

import { isAlphaNumeric, isValidCpf } from '../../config/regex';
import { typeBridgeZte, typePppoeZte } from '../../config/typesOnus';

import { getPeopleId } from '../apiVoalle/getPeopleId';
import { getConnectionId } from './getConnectionId';
import { IAuthOnuProps } from '../../interfaces/IAuthOnuProps';
import { updateConnection } from '../apiVoalle/updateConnection';

export async function AuthOnu(props: IAuthOnuProps){

    if(props.dataOnu.model === "parks"){
        if (props.isLoading){
            const err = 'warning/has-action-in-progress';
            props.handleError(err);
        }else if(props.pppoe.length === 0 || props.cpf.length === 0){
            props.handleError('info/required-input');
        }else if(!props.cpf.match(isValidCpf)){
            props.handleError('warning/invalid-cpf-input');
        }else{
            props.startLoading();
            let dataOlt: any[] = [];
            props.OltInfo.map((subArray) => {
                return subArray.map((option: any) => {
                    const verifyCity = option.name
                    if(props.city === 'TOMBOS'){
                        if(option.city_id === 22){
                            dataOlt.push(option.host);
                        }
                    }else if(verifyCity === props.city){
                        const ip = option.host;
                        dataOlt.push(ip);
                    }
                });
            });
            if(dataOlt.length > 1){
                dataOlt[0] = props.dataOnu.ip;
            }

            const peopleId = await getPeopleId(props.cpf);
            let connectionData = {contractId: 0, connectionId: 0, password: ''}

            if(peopleId){
                connectionData = await getConnectionId(peopleId, props.pppoe);
                if (!connectionData.contractId){
                    connectionData.contractId = 0
                }
            }else{
                connectionData.contractId = 0;
            }

            const hasAuth = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
                },
                data: {
                    ip: dataOlt[0],
                    slot: null,
                    pon: props.dataOnu.pon,
                    isPizzaBox: null,
                    serialNumber: props.dataOnu.serial,
                    type: 'parks',
                    contract: null,
                    pppoeUser: props.pppoe.toLowerCase(),
                    pppPass: props.pppoePass || null,
                    wifiSSID: props.wifiSSID || null,
                    wifiPass: props.wifiPass || null
                }
            })
            .then(response => {
                props.stopLoading();
                props.setDataFromApi([]);
                if(!response.data.responses.status){
                    return null;
                }
                return response.data.responses;
            })
            .catch(error => {
                props.stopLoading();
                props.handleError(error.data.messages.message);
                return;
            });

            if(hasAuth){
                props.handleError(hasAuth.status);
                if(connectionData.connectionId){
                    updateConnection({...props, connectionData})
                }
            }
        }
    }else{
        if (props.isLoading){
            const err = 'warning/has-action-in-progress';
            props.handleError(err);
        }else if(typeBridgeZte.includes((props.dataOnu.model)) && props.cpf.length === 0 ||
        (typeBridgeZte.includes(props.dataOnu.model) && props.pppoe.length === 0)){
            props.handleError('info/required-input');
        }else if(!props.cpf.match(isValidCpf)){
            props.handleError('warning/invalid-cpf-input');
        }else if(typePppoeZte.includes(props.dataOnu.model) && !props.wifiSSID.match(isAlphaNumeric)){
            props.handleError('info/wifi-ssid-did-not-match');
        }else if(typePppoeZte.includes(props.dataOnu.model) && !props.wifiPass.match(isAlphaNumeric)){
            props.handleError('info/wifi-password-did-not-match');
        }else if(typePppoeZte.includes(props.dataOnu.model) && props.wifiPass.length < 8){
            props.handleError('info/wrong-type-passoword');
        }else{
            props.startLoading();
            const oltData = props.OltInfo.find(option => option.name === props.city ? props.city : '')!;
            const peopleId: number = await getPeopleId(props.cpf);
            let connectionData = {contractId: 0, connectionId: 0, password: ''}

            if(peopleId){
                connectionData = await getConnectionId(peopleId, props.pppoe);
                if (!connectionData.contractId){
                    connectionData.contractId = 0;
                }
            }else{
                connectionData.contractId = 0;
            }

            const hasAuth = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
                },
                data: {
                    ip: [oltData.host],
                    slot: props.dataOnu.placa,
                    pon: props.dataOnu.pon,
                    isPizzaBox: oltData.isPizzaBox,
                    serialNumber: props.dataOnu.serial,
                    type: props.dataOnu.model,
                    contract: connectionData.contractId,
                    pppoeUser: props.pppoe.toLowerCase(),
                    pppPass: props.pppoePass || null,
                    wifiSSID: props.wifiSSID || null,
                    wifiPass: props.wifiPass || null
                }
            })
            .then(response => {
                props.stopLoading();
                props.setDataFromApi([]);
                if(!response.data.responses.response){
                    return null;
                }
                return response.data.responses;
            })
            .catch(error => {
                props.stopLoading();
                props.handleError(error.data.messages.message);
                return;
            });

            if(hasAuth){
                props.handleError(hasAuth.status);
                const oltId = hasAuth.response;
                if(connectionData.connectionId){
                    updateConnection({...props, connectionData, oltId})
                }
            }
        }
    }
}