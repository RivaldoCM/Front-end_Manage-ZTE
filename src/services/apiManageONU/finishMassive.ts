import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function finishMassive({massiveId, finished_status, finished_by}: {massiveId: number, finished_status: string, finished_by: number | undefined}): Promise<IResponseData | IResponseError> {
    const response = await axios({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/massive`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            id: massiveId,
            finished_status: finished_status,
            finished_by: finished_by,
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return response;
}