import axios from "axios";

export async function getConnectionId(cpf: string, peopleId: number, pppoe: string): Promise<any>{
    const connectionId = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getConnectionId`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            cpf: cpf,
            peopleId: peopleId,
            pppoe: pppoe
        }
    })
    .then(response => {
        if (!response.data.success) return response.data.messages.response;
        return response.data.responses.response;
    })
    .catch(() => {
        return null;
    });

    return connectionId;
}