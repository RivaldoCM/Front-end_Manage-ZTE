import axios from "axios";

export async function getConnectionId(peopleId: any, pppoe: string): Promise<any>{
    let connectionId;

    await axios.post(`http://localhost:4000/getConnectionId`, {
        peopleId: peopleId,
        pppoe: pppoe
    })
    .then(response => {
        connectionId = response.data;
    })

    return connectionId;
}