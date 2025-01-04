import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getTickets({userId, departmentId}: {userId?: number, departmentId?: number}): Promise<IResponseData | IResponseError>{
    const connectionId = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/tickets`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        params:{
            userId: userId,
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