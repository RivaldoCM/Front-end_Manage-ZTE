import axios from "axios"
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function addTicket(props: any): Promise<IResponseData | IResponseError | null>{
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/tickets`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            userId: props.userId,
            userDepartmentId: props.userDepartmentId,
            originDepartmentId: props.originDepartmentId,
            destinationDepartmentId: props.destinationDepartmentId,
            ticketTypeId: props.ticketTypeId,
            ctoId: props.ctoId,
            location: props.location,
            description: props.description,
        }
    }).then(response => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return response;
}