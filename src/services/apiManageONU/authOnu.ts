import axios from 'axios';

import { isNumeric, isAlphaNumeric } from '../../config/regex';
import { typeBridgeZte, typePppoeZte } from '../../config/tipsOlts';

import { getPeopleId } from '../apiVoalle/getPeopleId';
import { getConnectionId } from './getConnectionId';
import { IAuthOnuProps } from '../../interfaces/IAuthOnuProps';
import { updateConnection } from '../apiVoalle/updateConnection';

export async function AuthOnu(props: IAuthOnuProps){

    if(props.dataOnu[0].model == "parks"){
        if (props.isLoading){
            const err = 'warning/has-action-in-progress';
            props.handleError(err);
        }else if(props.pppoe.length === 0 || props.cpf.length === 0){
            props.handleError('info/required-input');
        }else if(!props.cpf.match(isNumeric)){
            props.handleError('warning/invalid-input');
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
                dataOlt[0] = props.dataOnu[0].ip;
            }

            const peopleId = await getPeopleId(props.cpf);
            let connectionId;

            if(peopleId){
                connectionId = await getConnectionId(peopleId, props.pppoe);
            }else{
                connectionId = props.cpf;
            }
            
            await axios.post(`${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`, {
                ip: dataOlt[0],
                slot: null,
                pon: props.dataOnu[0].pon,
                isPizzaBox: null,
                serialNumber: props.dataOnu[0].serial,
                type: 'parks',
                contract: null,
                pppoeUser: props.pppoe.toLowerCase(),
                pppPass: props.pppoePass || null,
                wifiSSID: props.wifiSSID || null,
                wifiPass: props.wifiPass || null
            })
            .then(response => {
                props.stopLoading();
                props.handleError(response.data);
                props.setDataFromApi([]);
                if(peopleId){ 
                    //updateConnection()
                }
            })
            .catch(error => {
                props.stopLoading();
                props.handleError(error.code);
            });
        }
    }else{
        if (props.isLoading){
            const err = 'warning/has-action-in-progress';
            props.handleError(err);
        }else if(typeBridgeZte.includes((props.dataOnu[0].model)) && props.cpf.length === 0 ||
        (typeBridgeZte.includes(props.dataOnu[0].model) && props.pppoe.length === 0)){
            props.handleError('info/required-input');
        }else if(!props.cpf.match(isNumeric)){
            props.handleError('info/non-expect-caracter-NAN');
        }else if(typePppoeZte.includes(props.dataOnu[0].model) && !props.wifiSSID.match(isAlphaNumeric)){
            props.handleError('info/wifi-ssid-did-not-match');
        }else if(typePppoeZte.includes(props.dataOnu[0].model) && !props.wifiPass.match(isAlphaNumeric)){
            props.handleError('info/wifi-password-did-not-match');
        }else if(typePppoeZte.includes(props.dataOnu[0].model) && props.wifiPass.length < 8){
            props.handleError('info/wrong-type-passoword');
        }else{
            props.startLoading();
            const oltData = props.OltInfo.find(option => option.name === props.city ? props.city : '')!;

            const peopleId = await getPeopleId(props.cpf);
            let connectionId: number | string;

            if(peopleId){
                connectionId = await getConnectionId(peopleId, props.pppoe);
            }else{
                connectionId = props.cpf;
            }

            await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
                },
                data: {
                    ip: [oltData.host],
                    slot: props.dataOnu[0].placa,
                    pon: props.dataOnu[0].pon,
                    isPizzaBox: oltData.isPizzaBox,
                    serialNumber: props.dataOnu[0].serial,
                    type: props.dataOnu[0].model,
                    contract: connectionId,
                    pppoeUser: props.pppoe.toLowerCase(),
                    pppPass: props.pppoePass || null,
                    wifiSSID: props.wifiSSID || null,
                    wifiPass: props.wifiPass || null
                }
            })
            .then(response => {
                props.stopLoading();
                props.handleError(response.data.responses.response);
                props.setDataFromApi([]);

                console.log(response.data.responses.data) //id
                if(peopleId){ 
                    updateConnection(response.data.responses.data, props.dataOnu[0].placa, props.dataOnu[0].pon, props.dataOnu[0].serial, props.wifiSSID, props.wifiPass, connectionId, props.pppoe, props.pppoePass)
                }
            })
            .catch(error => {
                props.stopLoading();
                props.handleError(error.code);
            });
        }
    }
}