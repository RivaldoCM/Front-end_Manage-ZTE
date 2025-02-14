import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getTickets({departmentId}: {departmentId: number}): Promise<IResponseData | IResponseError>{
    const connectionId = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/tickets`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        params:{
            originId: departmentId,
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(() => {
        return null;
    });
    return connectionId;
}