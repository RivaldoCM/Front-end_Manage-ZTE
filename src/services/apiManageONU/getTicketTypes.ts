import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getTicketTypes(departmentId: number | null): Promise<IResponseData | IResponseError>{
    const connectionId = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/ticketTypes`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        params:{
            departmentId: departmentId
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