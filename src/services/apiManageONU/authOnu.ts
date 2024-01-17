import axios from 'axios';

import { getPeopleId } from '../apiVoalle/getPeopleId';
import { getConnectionId } from './getConnectionId';
import { IAuthOnuProps } from '../../interfaces/IAuthOnuProps';
import { updateConnection } from '../apiVoalle/updateConnection';
import { useAuthOnu } from '../../hooks/useAuthOnu';

export async function AuthOnu(props: IAuthOnuProps){

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

            if(!response.data.responses.response){
                return null;
            }
            return response.data.responses;
        })
        .catch(error => {

            return;
        });

        if(hasAuth){
            const oltId = hasAuth.response;
            if(connectionData.connectionId){
                updateConnection({...props, connectionData, oltId})
            }
        }

    
}