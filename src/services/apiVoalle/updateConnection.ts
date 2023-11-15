import axios from "axios";

export async function updateConnection(avalableId: number, slot: number, pon: number, serialNumber: string, wifiSSID: string, wifiPass: string, connectionId: any ){

    await axios({
        headers: {
            'Authorization': `Bearer Token Here`
        },
        method: 'put',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/updateconnection/${connectionId}`,
        data: {
            "id": 0,
            "fiberMac": "",
            "mac": "",
            "password": "",
            "equipmentType": 0,
            "oltId": avalableId,
            "slotOlt": slot,
            "portOlt": pon,
            "equipmentSerialNumber": serialNumber,
            "ipType": 0,
            "equipmentUser": "",
            "equipmentPassword": "",
            "authenticationSplitterId": 0,
            "port": 0,
            "wifiName": wifiSSID,
            "wifiPassword": wifiPass,
            "technologyType": 0,
            "authenticationAccessPointId": 0,
            "updateConnectionParameter": true,
            "shouldMacUpdate": true,
            "user": "",
            "complement": "",
            "isIPoE": false

        }
    });
}