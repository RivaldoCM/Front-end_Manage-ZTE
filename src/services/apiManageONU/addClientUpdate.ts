import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function addClientUpdate(form: any): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/clientUpdate`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            userId: form.userId,
            serialNumber: form.serialNumber,
            pppoe: form.pppoe,
            portId: parseInt(form.portId),
            ctoId: parseInt(form.ctoId),
            ontPower: parseInt(form.ontPower),
            oltPower: parseInt(form.oltPower)
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}