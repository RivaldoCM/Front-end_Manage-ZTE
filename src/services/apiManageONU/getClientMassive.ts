import axios from "axios";

export async function getClientMassive({massiveId, cpf}: {massiveId: number, cpf: string | undefined}){
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/clientMassive`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data:{
            massiveId: massiveId,
            cpf: cpf
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    return response;
}