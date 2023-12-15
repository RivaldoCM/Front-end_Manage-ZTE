import axios from "axios";

import { getToken } from "./getToken";
import { IUpdateConnectionProps } from "../../interfaces/IUpdateConnectionProps";

export async function updateConnection(props: IUpdateConnectionProps){

    console.log(props.dataOnu)

    const data = {
        "id": props.connectionData.connectionId,
        "fiberMac": "",
        "mac": "",
        "password": props.connectionData.password, //PPPoE
        "equipmentType": 7,
        "oltId": props.oltId,
        "slotOlt": props.dataOnu.placa,
        "portOlt": props.dataOnu.pon,
        "equipmentSerialNumber": props.serialNumber,
        "ipType": 0,
        "equipmentUser": "",
        "equipmentPassword": "",
        "authenticationSplitterId": "",
        "port": "",
        "wifiName": props.wifiSSID,
        "wifiPassword": props.wifiPass,
        "technologyType": 16,
        "authenticationAccessPointId": props.dataOnu.accessPoint,
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
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    });

}