import axios from "axios";

import { getToken } from "./getToken";

export async function updateConnection(props: any){


    const data = {
        "id": props.connectionId,
        "fiberMac": "",
        "mac": "",
        "password": props.pppoePassword, //PPPoE
        "equipmentType": 7,
        "oltId": props.avalableId,
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
        "technologyType": 16,
        "authenticationAccessPointId": props.accessPointId,
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
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/updateconnection/${props.connectionId}`,
        data: data
    })
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    });
}