import axios from 'axios';
import { IAuthOnuProps } from '../../interfaces/IAuthOnuProps';
import { IResponseData, IResponseError } from '../../interfaces/IDefaultResponse';

export async function authorizationToOlt(props: IAuthOnuProps): Promise<IResponseData | IResponseError>{
    const {
        ip,
        pon,
        serialNumber,
        type,
        contract,
        pppoeUser,
    } = props;

    const hasAuth = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/writeONU`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            ip: ip,
            pon: pon,
            serialNumber: serialNumber,
            type: type,
            contract: contract,
            pppoeUser: pppoeUser,
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