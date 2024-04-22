import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function addBreakTime({userId, whichType}: {userId: number | undefined, whichType: number}): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakTime`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            userId: userId,
            typeId: whichType,
            active: true
        }
    }).then((response) => {
        return response.data;
    }).catch(() =>{
        return null;
    });

    return res;
}
