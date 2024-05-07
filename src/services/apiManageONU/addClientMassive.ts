import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function addClientMassive({cpf, name, cityId, massiveId, userId}: {cpf: string, name: string | null, cityId: number, massiveId: number, userId: number}): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/clientMassive`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            cpf: cpf.replace(/\D/g, ''),
            name: name,
            cityId: cityId,
            massiveId: massiveId,
            userId: userId
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}