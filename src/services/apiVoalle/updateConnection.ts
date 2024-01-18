import axios from "axios";

import { getToken } from "./getToken";
import { IUpdateConnectionProps } from "../../interfaces/IUpdateConnectionProps";

export async function updateConnection(props: IUpdateConnectionProps){
    let modelOLTVoalle: number = 0;
    if(props.onuType === 'zte'){
        modelOLTVoalle = 7;
    }else if(props.onuType === 'parks'){
        modelOLTVoalle = 4;
    }

    const data = {
        "id": props.connectionId,
        "fiberMac": "",
        "mac": "",
        "password": props.pppoePassword, //PPPoE
        "equipmentType": props.onuType,
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
    .then((response) => {
        console.log(response)
        return;
    }).catch((err) => {
        console.log(err)
        return;
    });
}