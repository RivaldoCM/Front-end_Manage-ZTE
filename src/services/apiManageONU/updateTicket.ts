import axios from "axios"
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function updateTicket({ ticketId, isViwed, appropriatedBy }: {ticketId: number, isViwed?: boolean, appropriatedBy?: number}): Promise<IResponseData | IResponseError | null>{
    console.log(appropriatedBy)
    const response = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/tickets`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            ticketId: ticketId,
            isViwed: isViwed,
            appropriatedBy: appropriatedBy
        }
    }).then(response => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return response;
}