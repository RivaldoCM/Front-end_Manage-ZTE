import axios from "axios";
import { IDeleteOnu } from "../../interfaces/IDeleteOnu";

export async function deleteOnu(dataToOlt: IDeleteOnu): Promise<any>{
    const data = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/deleteOnu`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: { 
            dataToOlt
        },
    }).then((res) => {
        return res.data;
    }).catch(() => {
        return false;
    });

    return data;
}