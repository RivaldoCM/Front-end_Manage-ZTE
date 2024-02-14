import axios from 'axios';
import { IAuthOnuProps } from '../../interfaces/IAuthOnuProps';
import { IResponseData, IResponseError } from '../../interfaces/IDefaultResponse';

export async function authorizationToOlt(props: IAuthOnuProps): Promise<IResponseData | IResponseError>{
    const {
        userId,
        cityId,
        oltId,
        ip,
        slot,
        pon,
        isPizzaBox,
        serialNumber,
        modelOlt,
        model,
        rxPower,
        contract,
        pppoeUser,
        pppPass,
        wifiSSID,
        wifiPass,
    } = props;

    const hasAuth = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            userId,
            cityId,
            oltId,
            ip: ip,
            slot: slot,
            pon: pon,
            isPizzaBox: isPizzaBox,
            serialNumber: serialNumber,
            modelOlt: modelOlt,
            model: model,
            rxPower,
            contract: contract,
            pppoeUser: pppoeUser,
            pppPass,
            wifiSSID,
            wifiPass,
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