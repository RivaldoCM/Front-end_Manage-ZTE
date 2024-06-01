import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function finishMassive(props: any): Promise<IResponseData | IResponseError>{
    const response = await axios({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/massive`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            id: props.massiveId,
            finished_status: props.finished_status,
            finished_by: props.userId,
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    return response;

}