import axios from "axios";

import { getToken } from "./getToken";

export async function updateConnection(avalableId: number, slot: number, pon: number, serialNumber: string, wifiSSID: string, wifiPass: string, connectionId: number | string, pppoe: string, pppoePassword: string ){

    await axios({
        headers: {
            'Authorization': "Bearer " + await getToken()
        },
        method: 'put',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/updateconnection/${connectionId}`,
        data: {
            "id": connectionId,
            "fiberMac": "", 
            "mac": "",
            "password": pppoePassword, //PPPoE
            "equipmentType": 7, 
            "oltId": avalableId || '', 
            "slotOlt": slot, 
            "portOlt": pon, 
            "equipmentSerialNumber": serialNumber, 
            "ipType": 0, 
            "equipmentUser": "",
            "equipmentPassword": "", 
            "authenticationSplitterId": "", 
            "port": "",
            "wifiName": wifiSSID, 
            "wifiPassword": wifiPass, 
            "technologyType": 16, 
            "authenticationAccessPointId": 875,
            "updateConnectionParameter": false,
            "shouldMacUpdate": false,
            "user": pppoe,
            "complement": "",
            "isIPoE": false
        }
    })
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    });
}