import axios from "axios"

export const addTickets = async (props: any) => {
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
            localization: props.localization,
            description: props.description,
        }
    }).then((response) => {

    }).catch((err) => {

    });

    return response;
}