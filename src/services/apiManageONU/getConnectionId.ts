import axios from "axios";

export async function getConnectionId(peopleId: any, pppoe: string){

    await axios.post(`${import.meta.env.VITE_BASEURL_MANAGE_ONU}/searchONU`, {
        peopleId: peopleId,
        pppoe: pppoe
    })
    .then(response => {
        return response;
    })
    .catch(error => {

    });
}