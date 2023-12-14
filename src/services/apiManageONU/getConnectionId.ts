import axios from "axios";

export async function getConnectionId(peopleId: any, pppoe: string): Promise<any>{
    const connectionId = await axios.post(`http://localhost:4000/getConnectionId`, {
        peopleId: peopleId,
        pppoe: pppoe
    })
    .then(response => {
        console.log(response.data.responses.response.connectionId)
        return response.data.responses.response;
    });

    return connectionId;
}