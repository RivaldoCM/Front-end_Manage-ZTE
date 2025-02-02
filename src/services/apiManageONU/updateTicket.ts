import axios from "axios"
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function updateTicket(props: any): Promise<IResponseData | IResponseError | null>{
    console.log(props)
    const response = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/tickets`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            userId: props.userId,
            ticketId: props.ticketId,
            cityId: props.cityId,
            ticketTypeId: props.ticketTypeId,
            ctoId: props.ctoId,
            localization: props.localization,
            description: props.description,
            appropriatedBy: props.appropriatedBy
        }
    }).then(response => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return response;
}