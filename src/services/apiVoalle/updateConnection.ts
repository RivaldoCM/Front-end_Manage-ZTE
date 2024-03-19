import axios from "axios";

import { getToken } from "./getToken";
import { IUpdateConnectionProps } from "../../interfaces/IUpdateConnectionProps.js";

export async function updateConnection(props: IUpdateConnectionProps){
    console.log(props)
    let modelOLTVoalle: number = 0;
    if(props.modelOlt === 10){
        modelOLTVoalle = 7;
    }else if(props.modelOlt === 20){
        modelOLTVoalle = 4;
    } else {
        modelOLTVoalle = 6;
    }

    const data = {
        "id": props.connectionId,
        "fiberMac": "",
        "mac": "",
        "password": props.pppoePassword, //PPPoE
        "equipmentType": modelOLTVoalle,
        "oltId": props.onuId,
        "slotOlt": props.slot,
        "portOlt": props.pon,
        "equipmentSerialNumber": props.serialNumber,
        "ipType": 0,
        "equipmentUser": "",
        "equipmentPassword": "",
        "authenticationSplitterId": "",
        "port": "",
        "wifiName": props.wifiSSID,
        "wifiPassword": props.wifiPass,
        "technologyType": 8,
        "authenticationAccessPointId": props.accessPointId[0],
        "updateConnectionParameter": false,
        "shouldMacUpdate": false,
        "user": props.pppoeUser,
        "complement": "",
        "isIPoE": false
    }

    await axios({
        headers: {
            'Authorization': "Bearer " + await getToken()
        },
        method: 'put',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/updateconnection/${props.connectionId}`,
        data: data
    })
    .then(() => {
        return;
    }).catch(() => {
        return;
    });
}