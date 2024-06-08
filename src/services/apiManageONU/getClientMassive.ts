import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getClientMassive({massiveId, cpf}: {massiveId: number, cpf: string | undefined}): Promise<IResponseData | IResponseError>{
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/clientMassive`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        params:{
            massiveId: massiveId,
            cpf: cpf
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    return response;
}