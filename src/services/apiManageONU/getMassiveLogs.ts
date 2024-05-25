import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getMassiveLogs({initialDate, lastDate, problemType, cityId, cpf}: any): Promise<IResponseData | IResponseError>{

    console.log(initialDate, lastDate, problemType, cityId)
    const res = await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/massiveLogs`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        params:{
            initialDate: initialDate,
            lastDate: lastDate,
            problemType: problemType,
            cityId: cityId,
            cpf: cpf
        }
    }).then((response) => {
        return response.data;
    }).catch(() =>{
        return null;
    });

    return res;
}
