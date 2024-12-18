import axios from 'axios';
import { IAuthOnuProps } from '../../interfaces/IAuthOnuProps';
import { IResponseData, IResponseError } from '../../interfaces/IDefaultResponse';

export async function writeONU(props: IAuthOnuProps): Promise<IResponseData | IResponseError>{
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            userId: props.userId,
            oltId: props.oltId,
            slot: props.slot,
            pon: props.pon,
            serialNumber: props.serialNumber,
            modelOnu: props.modelOnu,
            typeOnu: props.typeOnu,
            rxPower: props.rxPower,
            contract: props.contract,
            cpf: props.cpf,
            pppoeUser: props.pppoeUser,
            pppPass: props.pppPass,
            wifiSSID: props.wifiSSID,
            wifiPass: props.wifiPass,
            sipUser: props.sipUser,
            sipPass: props.sipPass
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(() => {
        return null;
    });

    return response;
}