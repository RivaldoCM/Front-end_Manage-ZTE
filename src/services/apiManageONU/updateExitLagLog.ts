import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function updateExitLagLog({userId, email}: {userId: number, email: string}): Promise<IResponseData | IResponseError | null>{
    const response = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/exitLagLogs`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            userId: userId,
            email: email
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(() => {
        return null;
    });
    return response;
}