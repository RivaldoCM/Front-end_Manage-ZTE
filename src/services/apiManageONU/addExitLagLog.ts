import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function addExitLagLog({userId, name, email}: {userId: number, name: string, email: string}): Promise<IResponseData | IResponseError | null>{
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/exitLagLogs`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            userId: userId,
            name: name,
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