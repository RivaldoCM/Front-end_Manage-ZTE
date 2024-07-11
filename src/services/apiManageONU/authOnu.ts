import axios from 'axios';
import { IAuthOnuProps } from '../../interfaces/IAuthOnuProps';
import { IResponseData, IResponseError } from '../../interfaces/IDefaultResponse';

export async function authorizationToOlt(props: IAuthOnuProps): Promise<IResponseData | IResponseError>{
    const {
        userId,
        oltId,
        slot,
        pon,
        serialNumber,
        modelOnu,
        typeOnu,
        rxPower,
        contract,
        pppoeUser,
        pppPass,
        wifiSSID,
        wifiPass,
    } = props;

    console.log(props)

/*
    const hasAuth = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            userId,
            oltId,
            slot: slot,
            pon: pon,
            serialNumber: serialNumber,
            modelOnu: modelOnu,
            typeOnu: typeOnu,
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
    */
}