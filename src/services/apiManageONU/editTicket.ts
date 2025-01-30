import axios from "axios"
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function editTicket(props: any): Promise<IResponseData | IResponseError | null>{
    console.log(props)
    const response = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/tickets`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            user: props.userId,
            ticket: props.ticketId,
            city: props.cityId,
            ticketType: props.ticketTypeId,
            cto: props.ctoId,
            loc: props.localization,
            descriptionTicket: props.description,
        }
    }).then(response => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return response;
}