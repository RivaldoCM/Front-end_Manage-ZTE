import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function addChatLog({userId, ticketId, message, isAutoMessage}: {userId: number | undefined, ticketId: number, message: string, isAutoMessage: boolean}): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/chatLog`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            userId: userId,
            ticketId: ticketId,
            message: message,
            isAutoMessage: isAutoMessage
        }
    }).then((response) => {
        return response.data;
    }).catch(() =>{
        return null;
    });

    return res;
}
