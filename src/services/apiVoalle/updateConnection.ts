import axios from "axios";

export async function updateConnection(req: any, _res: any){
    const { slot, pon, serialNumber, wifiSSID, wifiPass, connectionId } = req.body;

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
            "oltId": 0,
            "slotOlt": slot,
            "portOlt": pon,
            "equipmentSerialNumber": serialNumber,
            "ipType": 0,
            "equipmentUser": "",
            "equipmentPassword": "",
            "authenticationSplitterId": 0,
            "port": 0,
            "wifiName": "" || wifiSSID,
            "wifiPassword": "" || wifiPass,
            "technologyType": 0,
            "authenticationAccessPointId": 0,
            "updateConnectionParameter": true,
            "shouldMacUpdate": true,
            "user": "",
            "isIPoE": false,
            "complement": ""
        }
    });
}