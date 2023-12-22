import axios from "axios";

export async function getConnectionId(peopleId: any, pppoe: string): Promise<any>{
    const connectionId = await axios.post(`${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getConnectionId`, {
        peopleId: peopleId,
        pppoe: pppoe
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