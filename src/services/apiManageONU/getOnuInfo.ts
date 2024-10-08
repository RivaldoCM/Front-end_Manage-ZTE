import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getOnuInfo({cityId, serialNumber}: {cityId: number, serialNumber: string}): Promise<IResponseData | IResponseError>{
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/onuInfo`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        params: {
            cityId: cityId,
            serialNumber: serialNumber
        },
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        console.log(err)
        return null;
    });

    return response;
}