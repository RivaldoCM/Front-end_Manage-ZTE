import axios from "axios";

import { getToken } from "./getToken";
import { IUpdateConnectionProps } from "../../interfaces/IUpdateConnectionProps";

export async function updateConnection(props: IUpdateConnectionProps){
    let modelOLTVoalle: number = 0;
    if(props.typeOnu == 'zte'){
        modelOLTVoalle = 7;
    }else if(props.typeOnu == 'parks'){
        modelOLTVoalle = 4;
    }

    if(props.dataOnu.ip === '172.18.1.6'){
        props.dataOnu.accessPoint[0] = props.dataOnu.accessPoint[2]
    }else if(props.dataOnu.ip === '172.18.1.2'){
        props.dataOnu.accessPoint[0] = props.dataOnu.accessPoint[1]
    }

    const data = {
        "id": props.connectionData.connectionId,
        "fiberMac": "",
        "mac": "",
        "password": props.connectionData.password, //PPPoE
        "equipmentType": modelOLTVoalle,
        "oltId": props.oltId,
        "slotOlt": props.dataOnu.placa,
        "portOlt": props.dataOnu.pon,
        "equipmentSerialNumber": props.dataOnu.serial,
        "ipType": 0,
        "equipmentUser": "",
        "equipmentPassword": "",
        "authenticationSplitterId": "",
        "port": "",
        "wifiName": props.wifiSSID,
        "wifiPassword": props.wifiPass,
        "technologyType": 8,
        "authenticationAccessPointId": props.dataOnu.accessPoint[0],
        "updateConnectionParameter": false,
        "shouldMacUpdate": false,
        "user": props.pppoe,
        "complement": "",
        "isIPoE": false
    }

    await axios({
        headers: {
            'Authorization': "Bearer " + await getToken()
        },
        method: 'put',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/updateconnection/${props.connectionData.connectionId}`,
        data: data
    })
    .then(() => {
        return;
    }).catch(() => {
        return;
    });
}