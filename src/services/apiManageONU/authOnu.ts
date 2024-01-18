import axios from 'axios';
import { IAuthOnuProps } from '../../interfaces/IAuthOnuProps';
import { IResponseData, IResponseError } from '../../interfaces/IDefaultResponse';

export async function authorizationToOlt(props: IAuthOnuProps): Promise<IResponseData | IResponseError>{
    const {
        ip,
        slot,
        pon ,
        isPizzaBox,
        serialNumber,
        type,
        contract,
        pppoeUser,
        pppPass,
        wifiSSID,
        wifiPass
    } = props;

    const hasAuth = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            ip: ip,
            slot: slot,
            pon: pon,
            isPizzaBox: isPizzaBox,
            serialNumber: serialNumber,
            type: type,
            contract: contract,
            pppoeUser: pppoeUser,
            pppPass: pppPass || null,
            wifiSSID: wifiSSID || null,
            wifiPass: wifiPass || null 
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(() => {
        return null;
    });

    return hasAuth;
}