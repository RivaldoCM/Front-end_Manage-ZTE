import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getBreakTime(isRunning: Boolean, date?: string): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakTime`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        params: {
            isRunning: isRunning,
            date: date
        }
    }).then((response) => {
        return response.data;
    }).catch((err) =>{
        return err;
    });

    return res;
}
